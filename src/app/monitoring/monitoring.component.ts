import { Component, OnInit } from '@angular/core';
import { MonitoringService } from './monitoring.service';
interface Teammate {
    [key: string]: {
        role: number,
        act: string
    }
}
interface Roles {
    [index: number]: {
        name: string,
        skin: string,
        act: string
    }
}

interface Powers {
    [index: number]: string[]
}

interface Players {
    nick: string
}

interface ModInfo {
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
    players?: Players[],
    auction_role?: number,
    teammates?: BifacialTeammates[],
    online?: boolean,
    clients?: number,
    screen_time?: string
}

interface BifacialTeammates {
    player_id: number,
    role: number,
    skin_id: string,
    gender: string,
    nick: string,
    skin_url: string,
    role_name: string
}
@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.css']
})

export class MonitoringComponent implements OnInit {
    public messages: object[] = [];
    public skin_url: string = 'https://www.mafia-rules.net/img/persons/big/${skin}.png';
    public role_name: string = '';
    public power_url: string = 'https://www.mafia-rules.net/images/events/ripper/powers/${e.power_id}.png';
    public killer_url: string = 'https://www.mafia-rules.net/img/persons/big/killer_${e.gender}.png';
    public comissar_url: string = 'https://www.mafia-rules.net/img/persons/big/commisar_${e.gender}.png';
    public teammates: Teammate = {};
    public players: Players[] = [];
    public hideLoading: boolean = false;
    public hideNotFounded: boolean = false;
    public hideInfo: boolean = false;
    public isOffline: boolean = true;
    public client_text: string = '';

    public last_room: number = null;

    public auction: object = {};


    constructor(private monitoringService: MonitoringService) { }

    ngOnInit() {
        this.monitoringService.setTitle('Инфо модеров');
        this.monitoringService.socketConnect();
        this.monitoringService.sendMessage();
        this.monitoringService.on('message').subscribe((data: any) => {
            this.appendInfo(data);
        });
    }
    ngOnDestroy() {
        this.monitoringService.socketDisconnect();
    }

    appendInfo(data: any) {
        let info: any = {};
        data.info.forEach((e: ModInfo, i: number) => {
            let { player_id, room_id, type, gender, role, players, teammates } = e;
            if (!['status', 'clients'].includes(type)) {
                this.hideInfo = true;
            }
            switch (type) {
                case 'roles':
                    let { is_teammate } = e;
                    if (is_teammate) {
                        this.teammates[`${player_id}_${room_id}`] = {
                            role: role,
                            act: this.roles[role].act
                        };
                    }
                    let skin = `${this.roles[role].skin + e.skin_id}_${gender}`;
                    data.info[i].nick = this.players[player_id].nick;
                    data.info[i].role_name = this.roles[role].name;
                    data.info[i].skin_url = `https://www.mafia-rules.net/img/persons/big/${skin}.png`;
                    data.info[i].text = `${is_teammate ? '(напарник) ' : ' '}- `;
                    break;
                /* case 'power':
                    let { power_id } = e;
                    info.room_id = room_id;
                    info.power_name = this.powers[power_id][0];
                    info.power_description = this.powers[power_id][1];
                    info.power_url = `https://www.mafia-rules.net/images/events/ripper/powers/${power_id}.png`;
                    if (this.last_room !== room_id) {
                        this.last_room = room_id;
                    }
                    break; */
                case 'move':
                    let { from_id } = e;
                    switch (e.name) {
                        case 'night_act':
                            let role_exist = this.roles[this.teammates[from_id + '_' + room_id].role].name;
                            data.info[i].role_exist = (role_exist !== '');
                            data.info[i].teammate_role = role_exist;
                            data.info[i].teammate_act = this.roles[this.teammates[from_id + '_' + room_id].role].act;
                            data.info[i].act_uri = `https://www.mafia-rules.net/img/persons/big/${this.roles[this.teammates[from_id + '_' + room_id].role].skin}_f.png`;
                            break;
                        case 'bifacial_found':
                            if (teammates) {
                                teammates.forEach((e: BifacialTeammates, i: number) => {
                                    let { role, gender, skin_id } = e;
                                    let skin = `${this.roles[role].skin + skin_id}_${gender}`;
                                    this.teammates[`${player_id}_${room_id}`] = {
                                        role: role,
                                        act: this.roles[role].act
                                    };
                                    teammates[i].nick = this.players[player_id].nick;
                                    teammates[i].skin_url = `https://www.mafia-rules.net/img/persons/big/${skin}.png`;
                                    teammates[i].role_name = this.roles[role].name
                                });
                                data.info[i].teammates = teammates;
                            } else {
                                this.teammates[`${player_id}_${room_id}`] = {
                                    role: 26, // 25 - двул до превращ, 26 - двул после превращ
                                    act: this.roles[26].act
                                };
                                data.info[i].nick = this.players[player_id].nick;
                                data.info[i].description = `наш${gender == 'f' ? 'ла' : 'ёл'} мафию и получил${gender == 'f' ? 'а' : ''} право на убийство!`;
                                data.info[i].killer_url = `https://www.mafia-rules.net/img/persons/big/killer_${gender}.png`;
                            }
                            break;
                        case 'com_search':
                            data.info[i].role_name = this.roles[role].name;
                            break;
                        case 'serg_promotion':
                            data.info[i].comissar_url = `https://www.mafia-rules.net/img/persons/big/commisar_${gender}.png`;
                            break;
                    }
                    break;
                case 'private_message':
                    let time = new Date(),
                        hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours(),
                        minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes(),
                        screen_time = `${hours}:${minutes}`;
                    data.info[i].screen_time = screen_time;
                    break;
                case 'maf_chat':
                case 'yak_chat':
                    // all is ok
                    break;
                case 'status':
                    let { online } = e;
                    if (!online) {
                        this.hideInfo = true;
                        this.isOffline = false;
                    }
                    break;
                case 'clients':
                    let { clients } = e;
                    this.client_text = `${clients} зрител${this.declOfNum(clients, ['ь', 'я', 'ей'])}`;
                    break;
                case 'players_and_auction':
                    this.players = players;
                    let auction_role_id = e.auction_role;
                    if (auction_role_id === 99) {
                        auction_role_id = 10;//стерва
                    }
                    data.info[i].auction_name = this.roles[auction_role_id].name;
                    data.info[i].auction_uri = `https://www.mafia-rules.net/img/persons/big/${this.roles[auction_role_id].skin}_f.png`;
                    break;
            }
        });
        this.messages.push(...data.info);
    }

    declOfNum(n: number, titles: string[]) {
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }

    public roles: Roles = {
        0: { name: '', skin: '', act: '' },
        1: { name: 'Гражданин', skin: 'citizen', act: '' },
        2: { name: 'Мафиози', skin: 'mafiosos', act: ' Думаю нужно убить ' },
        3: { name: 'Маньяк', skin: 'maniac', act: ' Думаю нужно убить ' },
        4: { name: 'Комиссар', skin: 'commisar', act: ' Думаю нужно проверить ' },
        5: { name: 'Сержант', skin: 'sergeant', act: '' },
        6: { name: 'Доктор', skin: 'doctor', act: ' Думаю нужно навестить ' },
        7: { name: 'Медработник', skin: 'medic', act: '' },
        8: { name: 'Смертник', skin: 'deadman', act: '' },
        9: { name: 'Босс мафии', skin: 'boss', act: ' Думаю нужно заморозить ' },
        10: { name: 'Стерва', skin: 'bitch', act: 'Вы собрались охмурить игрока ' },
        11: { name: 'Вор', skin: 'thief', act: 'Вы собрались обворовать игрока ' },
        12: { name: 'Свидетель', skin: 'witness', act: ' Думаю нужно навестить ' },
        13: { name: 'Дед Мороз', skin: 'santa', act: '' },
        14: { name: 'Валентин', skin: 'valentin', act: '' },
        15: { name: 'Добрый зайка', skin: 'bunny', act: '' },
        16: { name: 'Подручный', skin: 'helper', act: '' },
        17: { name: 'Жирный Тони', skin: 'fattony', act: '' },
        18: { name: 'Чокнутый Профессор', skin: 'professor', act: '' },
        19: { name: 'Голем', skin: 'golem', act: '' },
        20: { name: 'Взрывная Лили', skin: 'lili', act: '' },
        21: { name: 'Мигель', skin: 'migel', act: '' },
        22: { name: 'Руди Кауфман', skin: 'rudy', act: '' },
        23: { name: 'Костюмер', skin: 'costumer', act: '' },
        24: { name: 'Санчо', skin: 'sancho', act: '' },
        25: { name: 'Двуликий', skin: 'bifacial', act: ' Иду искать Мафию к ' },
        26: { name: 'Двуликий', skin: 'killer', act: ' Ночью убью ' },
        27: { name: 'Вредный зайка', skin: 'bunny_e', act: '' },
        28: { name: 'Нефритовый заяц', skin: 'bunny_n', act: '' },
        29: { name: 'Громила', skin: 'bigman', act: '' },
        30: { name: 'Марко', skin: 'marko', act: '' },
        31: { name: 'Франческа', skin: 'francesca', act: '' },
        32: { name: 'Франческа', skin: 'f_killer', act: '' },
        33: { name: 'Розарио', skin: 'rosario', act: '' },
        34: { name: 'Потрошитель', skin: 'ripper', act: ' Моей жертвой будет ' },
        35: { name: 'Тётушка Лин', skin: 'leen', act: '' },
        36: { name: 'Якудза', skin: 'yakuza', act: ' Думаю нужно убить ' },
        37: { name: 'Гора', skin: 'hill', act: ' Иду бить игрока ' },
        38: { name: 'Тень', skin: 'shadow', act: ' Кидаю отравленный сюрикен в игрока ' },
        39: { name: 'Гадалка', skin: 'fteller', act: '' },
        40: { name: 'Чёрная Борода', skin: 'beard', act: '' },
        41: { name: 'Хулиганка Пеппи', skin: 'peppi', act: '' },
        42: { name: 'Супер-Мутант', skin: 'mutant', act: '' },
        43: { name: 'Бандит', skin: 'bandit', act: '' },
        44: { name: 'Убийца', skin: 'assassin1', act: ' Ночью убью ' },
        45: { name: 'Убийца', skin: 'assassin2', act: ' Ночью убью ' },
        46: { name: 'Убийца', skin: 'assassin3', act: ' Ночью убью ' },
        47: { name: 'Продажный комиссар', skin: 'fakecop', act: ' Иду убивать ' }
    };
    public powers: Powers = {
        1: ['Бессмертие', 'Вы мгновенно воскресаете после любого покушения на вас'],
        2: ['Ночной кошмар', 'Вы можете убивать игроков ночью даже после своей смерти'],
        3: ['Интуиция', 'В начале каждой ночи вы раскрываете роль случайного игрока'],
        4: ['Идеальный убийца', 'Ваше убийство ночью невозможно предотвратить'],
        5: ['Двойной удар', 'Во время ночного хода есть шанс убить свою жертву и соседнего игрока']
    };
}

