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
const xhr_1 = __importDefault(require("./xhr"));
const paid_1 = __importDefault(require("../models/paid"));
const auxiliary_1 = require("./auxiliary");
function socketBestmafiaConnection(io) {
    io.on('connection', (socket) => {
        socket.on('disconnect', () => socket.stop_search = true);
        socket.on('auth', (data) => __awaiter(this, void 0, void 0, function* () { return socket.emit('auth', yield socketAuth(data, socket, socket.handshake.headers)); }));
        socket.on('tail', (data) => tailEntrance(data, socket));
        socket.on('vk_message', (data) => sendVkMessage(data, socket));
    });
}
exports.default = socketBestmafiaConnection;
function socketAuth(data, socket, headers) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const info = {}, header = {
            'X-Forwarded-For': ((_a = headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '185.72.204.233',
            'User-Agent': headers['user-agent']
        }, { my_id, hash } = data;
        if (my_id && hash) {
            socket.my_id = my_id;
            socket.hash = hash;
            socket.headers = header;
            socket.bad_rooms = [];
            socket.stop_search = false;
            info.success = true;
            let player_info = yield paid_1.default.findOne({ maf_id: my_id });
            if (player_info) {
                let { bought, duration } = player_info;
                info.bought = auxiliary_1.dateFormat(bought);
                info.duration = auxiliary_1.dateFormat(duration);
            }
        }
        else {
            info.error = 'Ошибка в получении ID, либо HASH-а';
        }
        return info;
    });
}
function tailEntrance(data, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.stop_search = false;
        let { action, nicks } = data;
        const info = { action: action };
        if (action === 'stop') {
            info.success = true;
            socket.stop_search = true;
            socket.emit('tail', info);
        }
        else {
            const bad_rooms = socket.bad_rooms;
            bad_rooms.length = 0;
            const list = yield Request(socket, {
                method: 'uc_lst'
            });
            let found = false;
            if (list === null || list === void 0 ? void 0 : list.gml) {
                for (let e of list.gml) {
                    if (socket.stop_search) {
                        break;
                    }
                    let room_id = e[0];
                    if (!bad_rooms.includes(room_id)) {
                        const { gmp } = yield Request(socket, {
                            method: 'gam_players',
                            id: room_id
                        });
                        if (gmp) {
                            for (let e of gmp) {
                                let nick = e[1];
                                if (nicks.includes(nick)) {
                                    let entrance = yield roomEntrance(socket, room_id);
                                    if (entrance.length) {
                                        found = true;
                                        info.arr = entrance;
                                        socket.emit('tail', info);
                                        break;
                                    }
                                    else {
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
                    yield tailEntrance(data, socket);
                }
            }
            else {
                socket.emit('tail', list);
            }
        }
    });
}
function roomEntrance(socket, room_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let { arr } = yield Request(socket, {
            method: 'gam_join',
            id: room_id
        });
        if (arr) {
            return arr;
        }
        return [];
    });
}
let group_token = '2bb7f9d21ca23f0e889453c1d5cd2eb36f9ce0679c080ddcd0cf4cc79e37b0094201eebbac57c6d5a1b9d';
function sendVkMessage(data, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let { message, peer_id } = data;
        if (!+peer_id || (!+peer_id.toString().substr(2))) {
            peer_id = yield vkGetPeerId(peer_id.toString());
        }
        let error_text = '';
        if (!peer_id) {
            error_text = `Неправильно указан ID от VK\nУбедитесь, что вы ввели правильно свой ID`;
        }
        else {
            let query = encodeURI(`message=${message}&random_id=${Math.random()}&peer_id=${peer_id}&reply_to=${0}&access_token=${group_token}&v=5.101`), { error } = yield xhr_1.default.get(`https://api.vk.com/method/messages.send?${query}`, true);
            if (error) {
                error_text = `Ошибка в отправке сообщения\nСообщение: ${error.error_msg}`;
            }
        }
        socket.emit('vk_message', { error: error_text });
    });
}
function vkGetPeerId(peer_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = encodeURI(`user_ids=${peer_id}&access_token=${group_token}&v=5.110`), { response } = yield xhr_1.default.get(`https://api.vk.com/method/users.get?${query}`, true);
        return (response ? response[0].id : 0);
    });
}
function Request(socket, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { hash, headers } = socket;
        if (hash && headers) {
            let data = yield xhr_1.default.post(params, hash, headers);
            if (data === null || data === void 0 ? void 0 : data.die) {
                return { error: 'Сессия устарела' };
            }
            return data;
        }
        else {
            return { error: 'Ошибка в получении данных' };
        }
    });
}
