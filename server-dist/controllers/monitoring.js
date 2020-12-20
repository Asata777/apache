"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const xhr_1 = __importDefault(require("./xhr"));
const encode_id = 'a6aa93ff4aac4ba7e2750741c02a4847', monitoring_ids = [1613081 /* 9846264 */];
let last_room_id = null, already_read = false;
let clients = 0, pm_read = false;
function socketMonitoringConnection(io) {
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        ++clients;
        let allow_send_info = yield sendFirstInfo(io, socket);
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
        socket.on('message', (data) => {
            const pm_uri = `http://rpx2.www.mafia-rules.net/?identifier=${~~(+new Date / 1000)}:MAF_ID_${encode_id}`;
        });
    }));
}
exports.default = socketMonitoringConnection;
function sendFirstInfo(io, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        arr.push({
            type: 'clients',
            clients: clients
        });
        const is_online = yield checkOnline();
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
    });
}
function checkOnline() {
    return __awaiter(this, void 0, void 0, function* () {
        let { arr } = yield xhr_1.default.post({
            method: 'scrl_req',
            ids: monitoring_ids.map((e) => `uol_${e}`)
        });
        if (arr) {
            for (let i in arr) {
                if (arr[i][0]) {
                    return true;
                }
            }
        }
        return false;
    });
}
let previous_streaming = null;
function checkForRoomActivity(io) {
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        const room_id = yield getRoomId(monitoring_ids[0]), time = ~~(+new Date / 1000);
        if (room_id) {
            if (previous_streaming) {
                previous_streaming.abort();
                already_read = false;
                last_room_data.length = 0;
            }
            let stream_uri = `http://rpx2.www.mafia-rules.net/?identifier=${time}:MAF_II_${encode_id},${time}:MAF_GM_${room_id}`;
            getStreamInfo(stream_uri, io, room_id);
        }
    }), 1500);
}
function getRoomId(monitoring_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let { gml } = yield xhr_1.default.post({ method: 'uc_lst' });
        if (gml) {
            gml.forEach((e) => {
                let room_id = +e[0];
                e[9].forEach((e) => {
                    if (+e === monitoring_id && room_id !== last_room_id) {
                        last_room_id = room_id;
                        return room_id;
                    }
                });
            });
        }
        return null;
    });
}
function getStreamInfo(stream_uri, io, room_id, is_pm) {
    if (already_read) {
        return false;
    }
    if (!is_pm) {
        already_read = true;
    }
    let req = http_1.default.get(stream_uri, (res) => {
        if (!is_pm) {
            previous_streaming = req;
        }
        res.on('data', (d) => __awaiter(this, void 0, void 0, function* () {
            let info;
            try {
                info = JSON.parse(d.toString('UTF-8').replace(/data: /ig, ''));
            }
            catch (e) { }
            if (typeof info !== 'undefined' && info.length) {
                /* let game_id: string = info[0].ids[`MAF_II_${encode_id}`],
                    pm_id: string = info[0].ids[`MAF_ID_${encode_id}`]; */
                let data = info[0].data;
                getInfoType(data, room_id).then((res) => {
                    if (res.length) {
                        io.emit('message', { info: res });
                    }
                });
            }
        }));
    });
    req.on('error', (error) => {
        console.error(error);
    });
    req.end();
}
let last_room_data = [];
function getInfoType(data, room_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        data.forEach((e, i) => __awaiter(this, void 0, void 0, function* () {
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
                        let is_teammate = (monitoring_ids[0] !== e[1][0]);
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
                    let res = { type: 'move', room_id: +e[2], teammates: [] };
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
                            }
                            else {
                                res.player_id = +e[1][2];
                                res.gender = e[1][4];
                            }
                            break;
                        case 75:
                            let exp = e[1][3]; //опыт
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
                        case 310: //тень
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
                case 'prz': //получено жетонов (Ивент якудза) e[1]
                    break;
                case 'gs': //что на ауке
                    switch (e[1][0]) {
                        case 'init':
                            const players = yield getRoomPlayers(room_id);
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
        }));
        if (arr.length) {
            last_room_data.push(...arr);
            return arr;
        }
    });
}
function getRoomPlayers(room_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = {}, { gmp } = yield xhr_1.default.post({
            method: 'gam_players',
            id: room_id
        });
        if (gmp) {
            gmp.forEach((e) => {
                obj[e[0]] = {
                    nick: e[1]
                };
            });
        }
        return obj;
    });
}
