import http, { IncomingMessage } from 'http';
import httpRequest from './xhr';
import { Socket, Namespace } from 'socket.io';


const encode_id: string = 'a6aa93ff4aac4ba7e2750741c02a4847',
    monitoring_ids = [1613081/* 9846264 */];

let last_room_id: number = null,
    already_read: boolean = false;

interface FirstInfo {
    type?: string,
    clients?: number,
    online?: boolean
}

interface InfoType {
    type?: string,
    room_id?: number,
    player_id?: number,
    role?: number,
    skin_id?: number,
    gender?: string,
    is_teammate?: boolean,
    power_id?: number,
    name?: string,
    nick?: string,
    from_nick?: string,
    from_id?: number,
    to_nick?: string,
    message?: string,
    players?: object,
    auction_role?: number,
    teammates?: object[]
}
let clients = 0,
    pm_read = false;
export default function socketMonitoringConnection(io: Namespace) {
    io.on('connection', async (socket: Socket) => {
        ++clients;
        let allow_send_info = await sendFirstInfo(io, socket);
        if (allow_send_info) {
            if (!pm_read) {
                const pm_uri = `http://rpx2.www.mafia-rules.net/?identifier=${~~(+new Date / 1000)}:MAF_ID_${encode_id}`;
                getStreamInfo(pm_uri, io, 0, true);
                pm_read = true;
            }
            checkForRoomActivity(io);
        }
        socket.on('disconnect', () => {
            --clients;
        });
        socket.on('message', (data: any) => {
            const pm_uri = `http://rpx2.www.mafia-rules.net/?identifier=${~~(+new Date / 1000)}:MAF_ID_${encode_id}`;
        });
    });
}

async function sendFirstInfo(io: any, socket: Socket): Promise<boolean> {
    const arr: FirstInfo[] = [];
    arr.push({
        type: 'clients',
        clients: clients
    });
    const is_online: boolean = await checkOnline();
    if (!is_online) {
        arr.push({
            type: 'status',
            online: false
        });
        return false;
    }
    if (last_room_data.length) {
        socket.emit('message', { info: last_room_data });
    }
    io.emit('message', { info: arr });
    return true;
}

async function checkOnline(): Promise<boolean> {
    let { arr }: any = await httpRequest.post({
        method: 'scrl_req',
        ids: monitoring_ids.map((e: number) => `uol_${e}`)
    });
    if (arr) {
        for (let i in arr) {
            if (arr[i][0]) {
                return true;
            }
        }
    }
    return false;
}

let previous_streaming: any = null;
function checkForRoomActivity(io: any) {
    setInterval(async () => {
        const room_id: number = await getRoomId(monitoring_ids[0]),
            time: number = ~~(+new Date / 1000);
        if (room_id) {
            if (previous_streaming) {
                previous_streaming.abort();
                already_read = false;
                last_room_data.length = 0;
            }
            let stream_uri = `http://rpx2.www.mafia-rules.net/?identifier=${time}:MAF_II_${encode_id},${time}:MAF_GM_${room_id}`;
            getStreamInfo(stream_uri, io, room_id);
        }
    }, 1500);
}

async function getRoomId(monitoring_id: number): Promise<number> {
    let { gml }: any = await httpRequest.post({ method: 'uc_lst' });
    if (gml) {
        gml.forEach((e: any[]) => {
            let room_id: number = +e[0];
            e[9].forEach((e: any) => {
                if (+e === monitoring_id && room_id !== last_room_id) {
                    last_room_id = room_id;
                    return room_id;
                }
            });
        });
    }
    return null;
}

function getStreamInfo(stream_uri: string, io: any, room_id: number, is_pm?: boolean) {
    if (already_read) {
        return false;
    }
    if (!is_pm) {
        already_read = true;
    }
    let req: any = http.get(stream_uri, (res: IncomingMessage) => {
        if (!is_pm) {
            previous_streaming = req;
        }
        res.on('data', async d => {
            let info: any;
            try { info = JSON.parse(d.toString('UTF-8').replace(/data: /ig, '')) } catch (e) { }
            if (typeof info !== 'undefined' && info.length) {
                /* let game_id: string = info[0].ids[`MAF_II_${encode_id}`],
                    pm_id: string = info[0].ids[`MAF_ID_${encode_id}`]; */

                let data = info[0].data;
                getInfoType(data, room_id).then((res: InfoType[]) => {
                    if (res.length) {
                        io.emit('message', { info: res });
                    }
                });
            }
        });
    });
    req.on('error', (error: any) => {
        console.error(error);
    });
    req.end();
}
let last_room_data: any = [];
async function getInfoType(data: any[], room_id: number): Promise<InfoType[]> {
    const arr: InfoType[] = [];
    data.forEach(async (e: any, i: number) => {
        switch (e[0]) {
            case 'gd':
            case 'pd': //проверить есть ли в комнате
                if ((e[0] === 'gd' || e[1] === monitoring_ids[0]) && previous_streaming) {
                    // sent_players = false;
                    previous_streaming.abort();
                    already_read = false;
                    last_room_id = null;
                    last_room_data.length = 0;
                }
                break;
            case 'gp': // роли
                if (e[1].length !== 4) {
                    let is_teammate: boolean = (monitoring_ids[0] !== e[1][0]);
                    /* (data[i][1][0] !== e[1][0]) */
                    arr.push({
                        type: 'roles',
                        room_id: +e[2],
                        player_id: e[1][0],
                        role: e[1][1],
                        skin_id: e[1][2],
                        gender: e[1][3],
                        is_teammate: is_teammate
                    });
                }
                break;
            case 'pw': //супер-сила
                arr.push({
                    type: 'power',
                    room_id: +e[2],
                    power_id: +e[1]
                });
                break;
            case 'ge': //ночной ход
                let res: InfoType = { type: 'move', room_id: +e[2], teammates: [] };
                switch (e[1][0]) {
                    case 162: // двул никого не нашел
                        break;
                    case 164:
                        // нашел мафов
                        res.name = 'bifacial_found';
                        if (typeof e[1][2] === 'object') {
                            for (let i in e[1][2]) {
                                res.teammates.push({
                                    player_id: +i,
                                    role: e[1][2][i][0],
                                    skin_id: e[1][2][i][1],
                                    gender: e[1][2][i][2]
                                });
                            }
                        } else {
                            res.player_id = +e[1][2];
                            res.gender = e[1][4];
                        }
                        break;
                    case 75:
                        let exp = e[1][3];//опыт
                        // закончилась игра, результаты
                        break;
                    case 47: // серж превратился в кома
                        res.name = 'serg_promotion';
                        res.nick = e[1][2];
                        res.gender = e[1][3];
                        break;
                    case 45: // проверка кома
                        res.name = 'com_search';
                        res.nick = e[1][2];
                        res.role = e[1][4];
                        break;
                    case 21: //маф акт
                    case 25: //босс
                    case 41: // ком акт
                    case 160: //двулик
                    case 450: //убийца
                    case 280: // якудза
                    case 300: //гора
                    case 310://тень
                        res.name = 'night_act';
                        res.from_nick = e[1][4];
                        res.from_id = e[1][3];
                        res.to_nick = e[1][2];
                        break;
                }
                if (res.name) {
                    arr.push(res);
                }
                break;
            case 'pm': //приватка
                arr.push({
                    type: 'private_message',
                    from_nick: e[1][1],
                    to_nick: e[1][4],
                    message: e[1][2]
                });
                break;
            case 'mf':
            case 'tf':
                arr.push({
                    type: `${e[0] === 'mf' ? 'maf' : 'yak'}_chat`,
                    from_nick: e[1][1],
                    message: e[1][2],
                    room_id: room_id
                });
                break;
            case 'pa': //осталось монет e[1]
                break;
            case 'pr': //рейтинг ??? e[1]
                break;
            case 'prz':  //получено жетонов (Ивент якудза) e[1]
                break;
            case 'gs'://что на ауке
                switch (e[1][0]) {
                    case 'init':
                        const players = await getRoomPlayers(room_id);
                        arr.push({
                            type: 'players_and_auction',
                            players: players,
                            auction_role: +e[1][3],
                            room_id: room_id
                        });
                        break;
                }
                break;
        }
    });
    if (arr.length) {
        last_room_data.push(...arr);
        return arr;
    }
}

interface RoomPlayers {
    [key: string]: {
        nick: string
    }
}

async function getRoomPlayers(room_id: number): Promise<RoomPlayers> {
    let obj: RoomPlayers = {},
        { gmp }: any = await httpRequest.post({
            method: 'gam_players',
            id: room_id
        })
    if (gmp) {
        gmp.forEach((e: any[]) => {
            obj[e[0]] = {
                nick: e[1]
            }
        });
    }
    return obj;
}