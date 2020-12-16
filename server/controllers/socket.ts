import httpRequest from './xhr';
import { Namespace, Socket } from 'socket.io';
import Paid from '../models/paid';
import { dateFormat } from './auxiliary';

interface SocketAuth {
    success?: boolean,
    bought?: string,
    duration?: string,
    error?: string,
    my_id?: number,
    hash?: string
}
interface TailEntrance {
    action: string,
    nicks: string[]
}
interface VKMessage {
    peer_id: string | number,
    message: string
}
interface TailEntranceData extends SocketAuth {
    arr?: any[],
    action?: string,
    nicks?: string[],
}
export default function socketBestmafiaConnection(io: Namespace) {
    io.on('connection', (socket: any) => {
        socket.on('disconnect', () => socket.stop_search = true);
        socket.on('auth', async (data: SocketAuth) => socket.emit('auth', await socketAuth(data, socket, socket.handshake.headers)));
        socket.on('tail', (data: TailEntrance) => tailEntrance(data, socket));
        socket.on('vk_message', (data: VKMessage) => sendVkMessage(data, socket));
    });
}



async function socketAuth(data: SocketAuth, socket: any, headers: object): Promise<SocketAuth> {
    const info: SocketAuth = {},
        header = {
            'X-Forwarded-For': (headers['x-forwarded-for'] as string)?.split(',')[0] || '185.72.204.233',
            'User-Agent': headers['user-agent']
        },
        { my_id, hash } = data;
    if (my_id && hash) {
        socket.my_id = my_id;
        socket.hash = hash;
        socket.headers = header;
        socket.bad_rooms = [];
        socket.stop_search = false;
        info.success = true;
        let player_info: any = await Paid.findOne({ maf_id: my_id });
        if (player_info) {
            let { bought, duration } = player_info;
            info.bought = dateFormat(bought);
            info.duration = dateFormat(duration);
        }
    } else {
        info.error = 'Ошибка в получении ID, либо HASH-а';
    }
    return info;
}


async function tailEntrance(data: TailEntranceData, socket: any) {
    socket.stop_search = false;
    let { action, nicks } = data;
    const info: TailEntranceData = { action: action };
    if (action === 'stop') {
        info.success = true;
        socket.stop_search = true;
        socket.emit('tail', info);
    } else {
        const bad_rooms = socket.bad_rooms;
        bad_rooms.length = 0;
        const list = await Request(socket, {
            method: 'uc_lst'
        });
        let found = false;
        if (list?.gml) {
            for (let e of list.gml) {
                if (socket.stop_search) {
                    break;
                }
                let room_id = e[0];
                if (!bad_rooms.includes(room_id)) {
                    const { gmp } = await Request(socket, {
                        method: 'gam_players',
                        id: room_id
                    });
                    if (gmp) {
                        for (let e of gmp) {
                            let nick = e[1];
                            if (nicks.includes(nick)) {
                                let entrance = await roomEntrance(socket, room_id);
                                if (entrance.length) {
                                    found = true;
                                    info.arr = entrance;
                                    socket.emit('tail', info);
                                    break;
                                } else {
                                    bad_rooms.push(room_id);
                                }
                            }
                        }
                        if (found) {
                            socket.stop_search = true;
                            break;
                        }
                    }
                }
            }
            if (!found && !socket.stop_search) {
                await tailEntrance(data, socket);
            }
        } else {
            socket.emit('tail', list);
        }
    }
}

async function roomEntrance(socket: Socket, room_id: number): Promise<any[]> {
    let { arr } = await Request(socket, {
        method: 'gam_join',
        id: room_id
    });
    if (arr) {
        return arr;
    }
    return [];
}

let group_token = '2bb7f9d21ca23f0e889453c1d5cd2eb36f9ce0679c080ddcd0cf4cc79e37b0094201eebbac57c6d5a1b9d';

async function sendVkMessage(data: VKMessage, socket: Socket) {
    let { message, peer_id } = data;
    if (!+peer_id || (!+peer_id.toString().substr(2))) {
        peer_id = await vkGetPeerId(peer_id.toString());
    }
    let error_text = '';
    if (!peer_id) {
        error_text = `Неправильно указан ID от VK\nУбедитесь, что вы ввели правильно свой ID`
    } else {
        let query = encodeURI(`message=${message}&random_id=${Math.random()}&peer_id=${peer_id}&reply_to=${0}&access_token=${group_token}&v=5.101`),
            { error }: any = await httpRequest.get(`https://api.vk.com/method/messages.send?${query}`, true);
        if (error) {
            error_text = `Ошибка в отправке сообщения\nСообщение: ${error.error_msg}`;
        }
    }
    socket.emit('vk_message', { error: error_text });
}
interface GetPeerId {
    [index: number]: {
        id: number
    }
}
async function vkGetPeerId(peer_id: string): Promise<number> {
    let query = encodeURI(`user_ids=${peer_id}&access_token=${group_token}&v=5.110`),
        { response }: any = await httpRequest.get(`https://api.vk.com/method/users.get?${query}`, true);
    return (response ? response[0].id : 0);
}

interface BestmafiaData {
    die?: number,
    arr?: any[],
    error?: string,
    gmp?: any[],
    gml?: any[]
}

async function Request(socket: any, params: object): Promise<BestmafiaData> {
    const { hash, headers } = socket;
    if (hash && headers) {
        let data: BestmafiaData = await httpRequest.post(params, hash, headers);
        if (data?.die) {
            return { error: 'Сессия устарела' }
        }
        return data;
    } else {
        return { error: 'Ошибка в получении данных' };
    }
}