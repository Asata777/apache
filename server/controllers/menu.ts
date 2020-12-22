import httpRequest from './xhr';
import { getUrl } from './auxiliary';
import mongoose from 'mongoose';
import freeSchema, { FreeModel, FreeAccountModel } from '../models/free';
import paidSchema, { PaidModel } from '../models/paid';
import { Request, Response } from 'express';

export async function botMenu(req: Request, res: Response) {
    let { type } = req.params;
    if (type) {
        switch (type) {
            case 'paid_menu':
                let paid_error: number = await checkPaidMenu(req);
                if (!paid_error) {
                    res.sendFile(getMenuUrl('ff603b35d76fdef47ce48'));
                } else {
                    res.send(generateErrorMessage(paid_error));
                }
                break;
            case 'free_menu':
                let free_error: number = await checkFreeMenu(req);
                if (!free_error) {
                    res.sendFile(getMenuUrl('free'));
                } else {
                    res.send(generateErrorMessage(free_error));
                }
                break;
            default:
                res.send(`alert('${errors[5]}')`);
                break;
        }
    }
}
export function verifyMenuAccess(req: Request, res: Response) {
    if (req.headers['upgrade-insecure-requests'] || req.headers.origin) {
        return res.status(404).send('Error 404')
    }
    let types: string[] = ['paid_menu', 'free_menu'],
        { type } = req.params;
    if (types.includes(type)) {
        let script = `
            var _hash = PAGE_goto.toString().split('/')[2];
            var element = document.createElement('script');
            element.src = 'https://asata.club/bestmafia/'+_hash+'/${type}.js';
            document.body.appendChild(element);
        `;
        return res.send(script);
    }
}
function generateErrorMessage(error_id: number): string {
    let text = `location.reload(alert('${errors[error_id]}')#)`;
    switch (error_id) {
        case 2:
        case 3:
            text = text.replace('#', `, open('https://asata.club/shop')`);
            break;
        default:
            text = text.replace('#', ``);
    }
    return text;
}

function getMenuUrl(name: string): string {
    return getUrl(__dirname, `../../public/bestmafia/${name}.js`);
}

async function checkPaidMenu(req: Request): Promise<number> {
    let { error, enc_id, id, nick }: UserInfo = await getUserInfo(req),
        err = 0;
    if (!error) {
        let res: PaidModel = await paidSchema.findOne({ maf_id: id });
        if (res) {
            let date = +new Date,
                { active, duration } = res;
            if (active && duration > date) {
                if (!res.enc_id) {
                    await paidSchema.updateOne({ maf_id: id }, { enc_id, nick });
                } else if (res.enc_id !== enc_id) {
                    console.log('nu takoye')
                    err = 6;
                }
            } else {
                if (active) {
                    await paidSchema.updateOne({ maf_id: id }, { active: false });
                }
                err = 3;
            }
        } else {
            err = 2;
        }
        return err;
    } else {
        return error;
    }
}
async function checkFreeMenu(req: Request): Promise<number> {
    let { error, enc_id, id, nick, headers, hash }: UserInfo = await getUserInfo(req);
    if (!error) {
        let date_time = new Date,
            account = {
                active: true,
                hash: hash,
                headers: headers
            },
            ping = false,
            err = 0;
        if (moders.includes(id)) {
            ping = true;
        }
        let res: FreeModel = await freeSchema.findOne({ maf_id: id });
        if (res) {
            if (res.active) {
                await freeSchema.updateOne({ maf_id: id }, {
                    activity: date_time,
                    $inc: { count: 1 }
                });
            } else {
                err = 6;
        console.log(21)
            }
        } else {
            let info: any = {
                maf_id: id,
                nick,
                enc_id
            };
            ping ? info.account = account : null;
            await new freeSchema(<FreeModel>{
                _id: new mongoose.Types.ObjectId(),
                ...info
            }).save();
        }
        if (ping) {
            pingAllSessions();
        }
        return err;
    } else {
        return error;
    }
}
interface UserInfo {
    error: number,
    hash?: string,
    headers?: {
        'X-Forwarded-For': string,
        'User-Agent': string
    },
    enc_id?: string,
    id?: number,
    nick?: string
}

async function getUserInfo(req: Request): Promise<UserInfo> {
    let info: UserInfo = { error: 0 },
        { hash } = req.params,
        ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || '185.72.204.233',
        user_agent = req.headers['user-agent'],
        headers = {
            'X-Forwarded-For': ip,
            'User-Agent': user_agent
        };
    if (req.headers['upgrade-insecure-requests']) {
        console.log(123444);
        info.error = 6;
    }
    if (info.error) {
        return info;
    }
    info.hash = hash;
    info.headers = headers;
    let html: any = await httpRequest.get(hash, false, headers);
    if (html) {
        if (html.includes('Сессия устарела')) {
            console.log('Устарела сессия');
            info.error = 8;
        } else if (html.includes('Вы забанены!')) {
            info.error = 9;
            console.log('Игрок забанен');
        } else {
            let enc_id = html.split('var my_enc_id      = "')[1].split('";')[0],
                id = +html.split('var my_id          = ')[1].split(';')[0],
                nick = html.split('var my_nick        = "')[1].split('";')[0];
            if (enc_id && id && nick) {
                info.enc_id = enc_id;
                info.id = id;
                info.nick = nick;
            } else {
                info.error = 7;
            }
        }
    } else {
        console.log('Не получил html');
        info.error = 7;
    }
    return info;
}

async function pingAllSessions() {
    let interval: any;
    clearInterval(interval);
    let res: FreeModel[] = await freeSchema.find(),
        arr: any[] = [];
    if (res) {
        res.forEach((e: FreeModel) => {
            if (e.account?.active) {
                arr.push(e.account);
            }
        });
    }
    if (arr.length) {
        interval = setInterval(() => {
            if (!arr.length) {
                return clearInterval(interval);
            }
            arr.forEach(async (e: FreeAccountModel, i: number) => {
                let { t } = await httpRequest.post({
                    method: 'test'
                }, e.hash, e.headers);
                if (!t) {
                    arr.splice(i, 1);
                }
            });
        }, 8000);
    }
}
let all_ids: number[] = [];

async function updateAllIds(ids?: number[]) {
    let res: PaidModel = await paidSchema.findOne({ _id: '5ee9decd172c6e3a77dd6bde' });
    if (res) {
        if (!ids) {
            if (res.ids.length) {
                all_ids.push(...res.ids);
            }
        } else {
            let new_ids: number[] = [];
            ids.forEach((e) => {
                if (!all_ids.includes(e)) {
                    new_ids.push(+e);
                }
            });
            if (new_ids.length) {
                all_ids.push(...new_ids);
                await freeSchema.updateOne({ _id: '5ee9decd172c6e3a77dd6bde' }, {
                    $push: { ids: { $each: new_ids } }
                });
            }
        }
    }
}

updateAllIds();
export function playerIds() {
    return all_ids;
}
pingAllSessions();
setInterval(() => {
    httpRequest.post({ method: 'test' });
}, 10000);

setInterval(async () => {
    let ids: number[] = [],
        { gml }: any = await httpRequest.post({ method: 'uc_lst' });
    if (gml) {
        gml.forEach((e: any) => {
            e[9].forEach((id: string) => ids.push(+id));
        });
        if (ids.length) {
            updateAllIds(ids);
        }
    }
}, 1800000);

interface OnlinePlayers {
    photo: string,
    nick: string,
    id: number
}

export async function onlinePlayers(): Promise<OnlinePlayers[]> {
    let cnt = 0,
        online_players: OnlinePlayers[] = [];
    for (let i = 0; i < Math.ceil(all_ids.length / 50); ++i) {
        let { arr }: any = await httpRequest.post({
            method: 'scrl_req',
            ids: all_ids.slice(cnt, cnt + 50).map(e => `uol_${e}`)
        });
        if (arr) {
            for (let key in arr) {
                let value = arr[key],
                    id = +key.substr(4);
                if (value.length >= 3) {
                    online_players.push({
                        photo: value[4],
                        nick: value[1],
                        id: id
                    });
                }
            }
            cnt += 50;
        }
    }
    return online_players;

}

let moders: number[] = [
    11279390,
    11306565,
    8654061,
    209386,
    1102452,
    731560,
    25262,
    27993,
    954546,
    158715,
    2884777,
    1613081,
    7920341,
    1019353,
    434916,
    7486538,
    1336991,
    1798002,
    8064904,
    241787,
    8914011,
    8445653
];
let errors = {
    0: '',
    1: 'Использовать бот-меню можно только через сайт «bestmafia.com»',
    2: 'Нет доступа к бот-меню! Купить можно на сайте https://asata.club/shop',
    3: 'Закончился срок бот-меню',
    4: 'Произошла ошибка! Возможно устарела сессия, либо вас забанили. Попробуйте обновиться и вставить снова',
    5: 'Unclear request',
    6: 'Доступ вам запрещен!',
    7: 'Ошибка получения данных. Возможно вы играете не с официального сайта',
    8: 'Ошибка получения данных. Сессия устарела. Попробуйте обновиться',
    9: 'Ошибка получения данных. Аккаунт забанен',
}