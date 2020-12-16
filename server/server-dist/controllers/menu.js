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
exports.onlinePlayers = exports.playerIds = exports.verifyMenuAccess = exports.botMenu = void 0;
const xhr_1 = __importDefault(require("./xhr"));
const auxiliary_1 = require("./auxiliary");
const mongoose_1 = __importDefault(require("mongoose"));
const free_1 = __importDefault(require("../models/free"));
const paid_1 = __importDefault(require("../models/paid"));
function botMenu(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { type } = req.params;
        if (type) {
            switch (type) {
                case 'paid_menu':
                    let paid_error = yield checkPaidMenu(req);
                    if (!paid_error) {
                        res.sendFile(getMenuUrl('ff603b35d76fdef47ce48'));
                    }
                    else {
                        res.send(generateErrorMessage(paid_error));
                    }
                    break;
                case 'free_menu':
                    let free_error = yield checkFreeMenu(req);
                    if (!free_error) {
                        res.sendFile(getMenuUrl('free'));
                    }
                    else {
                        res.send(generateErrorMessage(free_error));
                    }
                    break;
                default:
                    res.send(`alert('${errors[5]}')`);
                    break;
            }
        }
    });
}
exports.botMenu = botMenu;
function verifyMenuAccess(req, res) {
    if (req.headers['upgrade-insecure-requests'] || req.headers.origin) {
        return res.status(404).send('Error 404');
    }
    let types = ['paid_menu', 'free_menu'], { type } = req.params;
    if (types.includes(type)) {
        let script = `
            var _hash = PAGE_goto.toString().split('/')[2];
            var element = document.createElement('script');
            element.src = 'https://asata.top/bestmafia/'+_hash+'/${type}.js';
            document.body.appendChild(element);
        `;
        return res.send(script);
    }
}
exports.verifyMenuAccess = verifyMenuAccess;
function generateErrorMessage(error_id) {
    let text = `location.reload(alert('${errors[error_id]}')#)`;
    switch (error_id) {
        case 2:
        case 3:
            text = text.replace('#', `, open('https://asata.top/shop')`);
            break;
        default:
            text = text.replace('#', ``);
    }
    return text;
}
function getMenuUrl(name) {
    return auxiliary_1.getUrl(__dirname, `../../public/bestmafia/${name}.js`);
}
function checkPaidMenu(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let { error, enc_id, id, nick } = yield getUserInfo(req), err = 0;
        if (!error) {
            let res = yield paid_1.default.findOne({ maf_id: id });
            if (res) {
                let date = +new Date, { active, duration } = res;
                if (active && duration > date) {
                    if (!res.enc_id) {
                        yield paid_1.default.updateOne({ maf_id: id }, { enc_id, nick });
                    }
                    else if (res.enc_id !== enc_id) {
                        console.log('nu takoye');
                        err = 6;
                    }
                }
                else {
                    if (active) {
                        yield paid_1.default.updateOne({ maf_id: id }, { active: false });
                    }
                    err = 3;
                }
            }
            else {
                err = 2;
            }
            return err;
        }
        else {
            return error;
        }
    });
}
function checkFreeMenu(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let { error, enc_id, id, nick, headers, hash } = yield getUserInfo(req);
        if (!error) {
            let date_time = new Date, account = {
                active: true,
                hash: hash,
                headers: headers
            }, ping = false, err = 0;
            if (moders.includes(id)) {
                ping = true;
            }
            let res = yield free_1.default.findOne({ maf_id: id });
            if (res) {
                if (res.active) {
                    yield free_1.default.updateOne({ maf_id: id }, {
                        activity: date_time,
                        $inc: { count: 1 }
                    });
                }
                else {
                    err = 6;
                    console.log(21);
                }
            }
            else {
                let info = {
                    maf_id: id,
                    nick,
                    enc_id
                };
                ping ? info.account = account : null;
                yield new free_1.default(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, info)).save();
            }
            if (ping) {
                pingAllSessions();
            }
            return err;
        }
        else {
            return error;
        }
    });
}
function getUserInfo(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let info = { error: 0 }, { hash } = req.params, ip = ((_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.split(',')[0]) || '185.72.204.233', user_agent = req.headers['user-agent'], headers = {
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
        let html = yield xhr_1.default.get(hash, false, headers);
        if (html) {
            if (html.includes('Сессия устарела')) {
                console.log('Устарела сессия');
                info.error = 8;
            }
            else if (html.includes('Вы забанены!')) {
                info.error = 9;
                console.log('Игрок забанен');
            }
            else {
                let enc_id = html.split('var my_enc_id      = "')[1].split('";')[0], id = +html.split('var my_id          = ')[1].split(';')[0], nick = html.split('var my_nick        = "')[1].split('";')[0];
                if (enc_id && id && nick) {
                    info.enc_id = enc_id;
                    info.id = id;
                    info.nick = nick;
                }
                else {
                    info.error = 7;
                }
            }
        }
        else {
            console.log('Не получил html');
            info.error = 7;
        }
        return info;
    });
}
function pingAllSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        let interval;
        clearInterval(interval);
        let res = yield free_1.default.find(), arr = [];
        if (res) {
            res.forEach((e) => {
                var _a;
                if ((_a = e.account) === null || _a === void 0 ? void 0 : _a.active) {
                    arr.push(e.account);
                }
            });
        }
        if (arr.length) {
            interval = setInterval(() => {
                if (!arr.length) {
                    return clearInterval(interval);
                }
                arr.forEach((e, i) => __awaiter(this, void 0, void 0, function* () {
                    let { t } = yield xhr_1.default.post({
                        method: 'test'
                    }, e.hash, e.headers);
                    if (!t) {
                        arr.splice(i, 1);
                    }
                }));
            }, 8000);
        }
    });
}
let all_ids = [];
function updateAllIds(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield paid_1.default.findOne({ _id: '5ee9decd172c6e3a77dd6bde' });
        if (res) {
            if (!ids) {
                if (res.ids.length) {
                    all_ids.push(...res.ids);
                }
            }
            else {
                let new_ids = [];
                ids.forEach((e) => {
                    if (!all_ids.includes(e)) {
                        new_ids.push(+e);
                    }
                });
                if (new_ids.length) {
                    all_ids.push(...new_ids);
                    yield free_1.default.updateOne({ _id: '5ee9decd172c6e3a77dd6bde' }, {
                        $push: { ids: { $each: new_ids } }
                    });
                }
            }
        }
    });
}
updateAllIds();
function playerIds() {
    return all_ids;
}
exports.playerIds = playerIds;
pingAllSessions();
setInterval(() => {
    xhr_1.default.post({ method: 'test' });
}, 10000);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    let ids = [], { gml } = yield xhr_1.default.post({ method: 'uc_lst' });
    if (gml) {
        gml.forEach((e) => {
            e[9].forEach((id) => ids.push(+id));
        });
        if (ids.length) {
            updateAllIds(ids);
        }
    }
}), 1800000);
function onlinePlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        let cnt = 0, online_players = [];
        for (let i = 0; i < Math.ceil(all_ids.length / 50); ++i) {
            let { arr } = yield xhr_1.default.post({
                method: 'scrl_req',
                ids: all_ids.slice(cnt, cnt + 50).map(e => `uol_${e}`)
            });
            if (arr) {
                for (let key in arr) {
                    let value = arr[key], id = +key.substr(4);
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
    });
}
exports.onlinePlayers = onlinePlayers;
let moders = [
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
    2: 'Нет доступа к бот-меню! Купить можно на сайте https://asata.top/shop',
    3: 'Закончился срок бот-меню',
    4: 'Произошла ошибка! Возможно устарела сессия, либо вас забанили. Попробуйте обновиться и вставить снова',
    5: 'Unclear request',
    6: 'Доступ вам запрещен!',
    7: 'Ошибка получения данных. Возможно вы играете не с официального сайта',
    8: 'Ошибка получения данных. Сессия устарела. Попробуйте обновиться',
    9: 'Ошибка получения данных. Аккаунт забанен',
};
