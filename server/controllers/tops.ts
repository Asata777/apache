import httpRequest from './xhr';
import { Socket, Namespace } from 'socket.io';
interface Tops {
    nick: string,
    count: number,
    online: boolean
}
interface topsPromise {
    users: object[],
    category: string
}
export default function socketTopsConnection(io: Namespace) {
    let tops_interval: any,
        last_users: object[] = [];
    io.on('connection', (socket: Socket) => {
        socket.on('message', data => {
            clearInterval(tops_interval);
            let category = data.category;
            last_users = [{}];
            if (category) {
                tops_interval = setInterval(async () => {
                    let online_tops = await onlineTops(category),
                        users = online_tops?.users,
                        equals = compareArrays(users, last_users);
                    if (!equals) {
                        socket.emit('message', online_tops);
                        last_users = users;
                    }
                }, 1000);
            }
        });
    });
}

async function onlineTops(category: string): Promise<topsPromise> {
    let info: Tops[] = [],
        is_love: boolean = (category === 'love_d'),
        { arr } = await httpRequest.post({
            method: 'top_req',
            t: category
        });
    if (arr) {
        arr.forEach((e: any[]) => {
            info.push({
                nick: (is_love ? `${e[1]} + ${e[3]}` : e[1]),
                count: e[is_love ? 4 : 2],
                online: (e[e.length - 1] > 0)
            });
        });
        return {
            users: info,
            category: category
        }
    }
}

function compareArrays(arr1: object[], arr2: object[]): boolean {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}