import httpRequest from './xhr';
import { playerIds } from './menu';
import got from 'got';


interface ModerList {
    photo?: string,
    nick?: string,
    url?: string,
    id?: number,
    admin?: boolean
}

let admins = [1102452, 731560, 27993, 25262, 954546];
export function getModersOnline(): ModerList[] {
    return moders_online;
}
/* export async function getModersOnline(): Promise<object> {
    let cnt = 0,
        moders_list: ModerList[] = [],
        player_ids = playerIds();
    if (player_ids.length) {
        for (let i = 0; i < Math.ceil(player_ids.length / 50); ++i) {
            let { arr }: any = await httpRequest.post({
                method: 'scrl_req',
                ids: player_ids.slice(cnt, cnt + 50).map((e: number) => `uol_${e}`)
            });
            if (arr) {
                for (let key in arr) {
                    let value = arr[key],
                        id = +key.substr(4);
                    if (value.length >= 3 && (value[3][2] || id === 27993)) {
                        let url = '';
                        contacts.forEach(e => {
                            if (e.id == id) {
                                url = e.url;
                            }
                        });
                        moders_list.push({
                            photo: value[4],
                            nick: value[1],
                            url: url,
                            id: id,
                            admin: admins.includes(id)
                        });
                    }
                }
                cnt += 50;
            }
        }
    }
    return { info: moders_list };
} */


interface OnlineList {
    ids: string[],
    length: number
}
let moders_online: ModerList[] = [];
async function getOnlineModers() {
    moders_online.length = 0;
    let player_ids = playerIds(),
        cnt = 0;
    if (player_ids.length) {
        let res: any = await httpRequest.post({
            method: 'scrl_req',
            ids: ['uol_2194163']
        });
        const uri = `http://www.mafia-rules.net/standalone/3808411988983a552ab8a19f7fa02955/DO/0.87189433249816`;
        let body = await got.post(uri, {
            form: {
                method: 'scrl_req',
                ids: ['uol_2194163']
                // method: 'prf'
            },
            headers: {
                "X-Forwarded-For": "185.72.204.233",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
            }
        }).json();

        /* for (let i = 0; i < Math.ceil(player_ids.length / 50); ++i) {
            let { arr }: any = await httpRequest.post({
                method: 'scrl_req',
                ids: player_ids.slice(cnt, cnt + 10).map((e: number) => `uol_${e}`)
            });
            console.log(arr);
            if (arr) {
                for (let key in arr) {
                    let value = arr[key],
                        id = +key.substr(4);
                    if (value.length >= 3 && (value[3][2] || id === 27993)) {
                        let url = '';
                        contacts.forEach(e => {
                            if (e.id == id) {
                                url = e.url;
                            }
                        });
                        moders_online.push({
                            photo: value[4],
                            nick: value[1],
                            url: url,
                            id: id,
                            admin: admins.includes(id)
                        });
                    }
                }
                cnt += 50;
            }
        } */
    } else {
        console.log('No')
    }
}

setTimeout(getOnlineModers, 4000);

setInterval(async () => {
    await getOnlineModers();
}, 600000 * 5);

export async function onlineList(min: number, max: number): Promise<OnlineList> {
    let obj: OnlineList = {
        ids: [],
        length: 0
    };
    let { ids }: any = await httpRequest.post({
        method: 'uol_find',
        val: '%%%'
    });
    if (ids) {
        obj.ids = ids.slice(min, max);
        obj.length = ids.length;
    }
    return obj;
}

interface Contacts {
    id: number,
    url: string
}

let contacts: Contacts[] = [
    {
        id: 8445653,
        url: 'https://vk.com/tankistvmf'
    },
    {
        id: 8914011,
        url: 'https://vk.com/sativa22' //Анастасия Чёрная
    },
    {
        id: 241787,
        url: 'https://vk.com/marina_evgen'
    },
    {
        id: 8064904,
        url: 'https://vk.com/id523706504'
    },
    {
        id: 1798002,
        url: 'https://vk.com/id72504192'
    },
    {
        id: 1336991,
        url: 'https://vk.com/id11158396'
    },
    {
        id: 7486538,
        url: 'https://vk.com/victoria_dorofeeva'
    },
    {
        id: 434916,
        url: 'https://vk.com/epifanova3'
    },
    {
        id: 1019353,
        url: 'https://vk.com/lero4qaaa'
    },
    {
        id: 7920341,
        url: 'https://vk.com/id63876805' //Ирина Залымова
    },
    {
        id: 1613081,
        url: 'https://vk.com/id235876782'
    },
    {
        id: 2884777,
        url: 'https://vk.com/id534405717'
    },
    {
        id: 158715,
        url: 'https://vk.com/zaggreebu'
    },
    {
        id: 954546,
        url: 'https://vk.com/ks.albi'
    },
    {
        id: 27993,
        url: 'https://vk.com/tygvuhbijn'
    },
    {
        id: 25262,
        url: 'https://vk.com/d.kapun'
    },
    {
        id: 731560,
        url: 'https://vk.com/id138138112'
    },
    {
        id: 1102452,
        url: 'https://vk.com/id97956944'
    },
    {
        id: 209386,
        url: 'https://vk.com/hochu_utonut_v_grusti'
    },
    {
        id: 8654061,
        url: 'https://vk.com/mafia.m.chata1'
    },
    {
        id: 11306565,
        url: 'https://vk.com/mafia.m.chata2'
    },
    {
        id: 11279390,
        url: 'https://vk.com/id527533865'
    },
    {
        id: 5170528,
        url: 'https://vk.com/id2352411'
    },
    {
        id: 10810089,
        url: 'https://vk.com/id215162871'
    },
    {
        id: 7922799,
        url: 'https://vk.com/yuliya_anuchina' //Юлия Анучина
    },
    {
        id: 9754309,
        url: 'https://vk.com/id125903335' //Надежда Иванова
    },
    {
        id: 2876562,
        url: 'https://vk.com/kimsya'
    },
    {
        id: 3025224,
        url: 'https://vk.com/endlessness7'//Светлана Кондратьева
    },
    {
        id: 7044265,
        url: 'https://vk.com/id375162709'// Артем Маслаков
    },
    {
        id: 6569078,
        url: 'https://vk.com/matveeva_anastasiya' //Анастасия Матвеева
    },
    {
        id: 80423,
        url: 'https://vk.com/violetta_kon' //Виолетта Кондакова
    },
    {
        id: 8635192,
        url: 'https://vk.com/i_mikhalev' //Илья Михалёв
    },
    {
        id: 9753111,
        url: 'https://vk.com/id235876782'
    }
];

