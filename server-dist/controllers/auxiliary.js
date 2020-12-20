"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.helpers = exports.KeepAlive = exports.dateFormat = exports.duel_tasks = exports.moders = exports.balance = exports.registr = exports.statistics = exports.rank = exports.achievements_i = exports.achievements = exports.extras_i = exports.extras = void 0;
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
exports.extras = {
    _id: 0,
    ext: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0
    }
};
exports.extras_i = {
    1: { price: 3, limit: 9999999 },
    2: { id: 2, price: 200, limit: 2 },
    3: { id: 3, price: 300, limit: 2 },
    4: { price: 500, limit: 2 },
    5: { price: 500, limit: 5 },
    6: { price: 1000, limit: 2 },
    7: { price: 1500, limit: 2 },
    8: { price: 200, limit: 2 },
    9: { price: 1500, limit: 2 },
    10: { price: 300, limit: 2 },
    11: { price: 2000, limit: 2 },
    12: { price: 800, limit: 2 },
    13: { price: 1000, limit: 3 },
    14: { price: 1000, limit: 3 },
    15: { price: 500, limit: 2 },
    16: { price: 1000, limit: 2 },
    17: { price: 1000, limit: 2 },
    18: { price: 800, limit: 2 },
    19: { price: 800, limit: 2 },
    20: { price: 800, limit: 2 },
    21: { price: 2000, limit: 2 },
    22: { price: 3000, limit: 2 },
    23: { price: 1000, limit: 2 },
    24: { price: 1000, limit: 2 },
    25: { price: 500, limit: 2 }
};
exports.achievements = {
    _id: 0,
    rank: 0,
    stars: 0,
    ach: {
        1: { step: 0, progress: 0 },
        2: { step: 0, progress: 0 },
        3: { step: 0, progress: 0 },
        4: { step: 0, progress: 0 },
        5: { step: 0, progress: 0 },
        6: { step: 0, progress: 0 },
        7: { step: 0, progress: 0 },
        8: { step: 0, progress: 0 },
        9: { step: 0, progress: 0 },
        10: { step: 0, progress: 0 },
        11: { step: 0, progress: 0 },
        12: { step: 0, progress: 0 },
        13: { step: 0, progress: 0 },
        14: { step: 0, progress: 0 },
        15: { step: 0, progress: 0 },
        16: { step: 0, progress: 0 },
        17: { step: 0, progress: 0 },
        18: { step: 0, progress: 0 },
        19: { step: 0, progress: 0 },
        20: { step: 0, progress: 0 },
        21: { step: 0, progress: 0 },
        22: { step: 0, progress: 0 },
        23: { step: 0, progress: 0 },
        24: { step: 0, progress: 0 },
        25: { step: 0, progress: 0 },
        26: { step: 0, progress: 0 },
        27: { step: 0, progress: 0 },
        28: { step: 0, progress: 0 },
        29: { step: 0, progress: 0 },
        30: { step: 0, progress: 0 },
        31: { step: 0, progress: 0 },
        32: { step: 0, progress: 0 },
        33: { step: 0, progress: 0 },
        34: { step: 0, progress: 0 },
        35: { step: 0, progress: 0 },
        36: { step: 0, progress: 0 },
        37: { step: 0, progress: 0 },
        38: { step: 0, progress: 0 },
        39: { step: 0, progress: 0 },
        40: { step: 0, progress: 0 },
        41: { step: 0, progress: 0 },
        42: { step: 0, progress: 0 }
    }
};
exports.achievements_i = {
    1: { limit: [3, 5, 7, 10], award: [5, 25, 50, 75] },
    2: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    3: { limit: [15, 30, 45, 60], award: [5, 25, 50, 75] },
    4: { limit: [20, 40, 60, 80], award: [5, 25, 50, 75] },
    5: { limit: [20, 40, 60, 80], award: [5, 25, 50, 75] },
    6: { limit: [20, 40, 60, 80], award: [5, 25, 50, 75] },
    7: { limit: [20, 40, 60, 80], award: [5, 25, 50, 75] },
    8: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    9: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    10: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    11: { limit: [15, 30, 45, 60], award: [5, 25, 50, 75] },
    12: { limit: [2, 5, 15, 25], award: [5, 25, 50, 75] },
    13: { limit: [1, 2, 3, 5], award: [5, 25, 50, 75] },
    14: { limit: [10, 25, 50, 100], award: [5, 25, 50, 75] },
    15: { limit: [25, 50, 100, 150], award: [5, 25, 50, 75] },
    16: { limit: [2, 3, 4, 5], award: [5, 25, 50, 75] },
    17: { limit: [15, 25, 35, 50], award: [5, 25, 50, 75] },
    18: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    19: { limit: [15, 25, 30, 50], award: [5, 25, 50, 75] },
    20: { limit: [15, 30, 45, 60], award: [5, 25, 50, 75] },
    21: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    22: { limit: [10, 15, 20, 25], award: [5, 25, 50, 75] },
    23: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    24: { limit: [10, 30, 50, 100], award: [5, 25, 50, 75] },
    25: { limit: [30, 50, 100, 150], award: [5, 25, 50, 75] },
    26: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    27: { limit: [30, 50, 100, 150], award: [5, 25, 50, 75] },
    28: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    29: { limit: [20, 40, 60, 80], award: [5, 25, 50, 75] },
    30: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    31: { limit: [5, 10, 15, 30], award: [5, 25, 50, 75] },
    32: { limit: [25, 50, 75, 100], award: [5, 25, 50, 75] },
    33: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    34: { limit: [10, 20, 30, 40], award: [5, 25, 50, 75] },
    35: { limit: [40, 60, 100, 150], award: [5, 25, 50, 75] },
    36: { limit: [3, 5, 10, 15], award: [5, 25, 50, 75] },
    37: { limit: [25, 45, 60, 120], award: [5, 25, 50, 75] },
    38: { limit: [100, 250, 500, 1000], award: [75, 150, 250, 300] },
    39: { limit: [5000, 25000, 50000, 100000], award: [75, 150, 250, 300] },
    40: { limit: [5, 20, 40, 80], award: [75, 150, 250, 300] },
    41: { limit: [5, 25, 50, 100], award: [75, 150, 250, 300] },
    42: { limit: [10, 30, 70, 150], award: [75, 150, 250, 300] }
};
exports.rank = {
    1: { stars: 150, money: 15000 },
    2: { stars: 300, money: 20000 },
    3: { stars: 500, money: 25000 },
    4: { stars: 750, money: 30000 },
    5: { stars: 1050, money: 35000 },
    6: { stars: 1400, money: 40000 },
    7: { stars: 1800, money: 45000 },
    8: { stars: 2250, money: 50000 },
    9: { stars: 2750, money: 55000 },
    10: { stars: 3300, money: 60000 },
    11: { stars: 3900, money: 65000 },
    12: { stars: 4550, money: 70000 },
    13: { stars: 5250, money: 75000 },
    14: { stars: 6000, money: 80000 },
    15: { stars: 6800, money: 85000 },
    16: { stars: 7650, money: 90000 },
    17: { stars: 8550, money: 95000 },
    18: { stars: 9500, money: 100000 },
    19: { stars: 10500, money: 100000 },
    20: { stars: 11500, money: 100000 },
    21: { stars: 12500, money: 100000 },
    22: { stars: 13500, money: 100000 },
    23: { stars: 14500, money: 100000 },
    24: { stars: 15500, money: 100000 },
    25: { stars: 16500, money: 100000 },
    26: { stars: 17500, money: 100000 },
    27: { stars: 18500, money: 100000 },
    28: { stars: 19500, money: 100000 },
    29: { stars: 20500, money: 100000 },
    30: { stars: 21500, money: 100000 }
};
exports.statistics = {
    _id: 0,
    play_count: 0,
    win_c: 0,
    loose_c: 0,
    spent_money: 0,
    max_money_win: 0,
    max_rating_win: 0,
    max_rating: 0,
    spent_extras: 0,
    spent_time: 0,
    citizen_c: 0,
    maf_c: 0,
    cheriff_c: 0,
    doctor_c: 0,
    two_faced_c: 0,
    thief_c: 0,
    witness_c: 0,
    boss_c: 0,
    event_c: 0,
    two_faced_w: 0,
    maf_w: 0,
    man_w: 0,
    boss_w: 0,
    event_w: 0
};
exports.registr = {
    _id: 0,
    nick: '',
    password: '',
    level: 0,
    photo: '/photo/1.jpg',
    gender: 0,
    balance: {
        money: 0,
        ruby: 0
    },
    marriage: {
        id: 0,
        duration: 0
    },
    ban: {
        name: 0,
        time: 0
    },
    block: [],
    favs: [],
    rank: 0,
    hash: ''
};
exports.balance = {
    money: {
        1: [5000, 80],
        2: [25000, 150],
        3: [50000, 500],
        4: [100000, 750]
    },
    ruby: {
        1: [3, 20],
        2: [10, 50],
        3: [50, 200],
        4: [100, 600]
    }
};
exports.moders = [{
        id: 8445653,
        url: 'https://vk.com/tankistvmf'
    },
    {
        id: 8914011,
        url: 'https://vk.com/sativa22'
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
        url: 'https://vk.com/id63876805'
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
    }
];
exports.duel_tasks = {
    1: { text: "Кто больше наберёт опыта в клан" },
    2: { text: "Кто больше наберет рейтинга за игры" },
    3: { text: "Кто больше выиграет ролей на аукционе" },
    4: { text: "Кто больше убьёт боссов на главной странице" },
    6: { text: "Кто больше убьёт игроков из револьвера" },
    7: { text: "Кто больше использует любых экстр" },
    8: { text: "Кто больше подарит подарков" },
    9: { text: "Кто больше застрелит игроков из АК-47" },
    10: { text: "Кто больше подорвет игроков на мине" },
    11: { text: "Кто больше раскроет ролей картами таро" },
    12: { text: "Кто больше раскроет ролей картами таро" },
    13: { text: "Кто больше сорвёт масок у других игроков" },
    14: { text: "Кто больше выиграет игр на 20 игроков" },
    15: { text: "Кто больше усыпит игроков при помощи Снотворного" },
    16: { text: "Кто больше подарит мега-подарков" },
    17: { text: "Кто больше подарит рядов из любых подарков" },
    18: { text: "Кто больше поставит жучков другим игрокам с жучками" },
    19: { text: "Кто больше выиграет игр со ставкой 1000 и выше" },
    20: { text: "Кто больше выиграет игр на 12 игроков" },
    21: { text: "Кто больше выиграет игр на 16 игроков" },
    22: { text: "Кто больше сыграет активных ролей" },
    23: { text: "Кто больше посадит мафиози за решётку" },
    24: { text: "Кто больше убьёт игроков киллером" },
    25: { text: "Кто больше найдёт активных ролей при помощи жучков" },
    26: { text: "Кто больше потратит монет на аукционе" },
    27: { text: "Кто больше выиграет за команду граждан" },
    28: { text: "Кто больше выиграет за команду мафии" },
    29: { text: "Кто больше выиграет любых игр" },
    30: { text: "Кто больше победит игроков в драке" },
    31: { text: "Кто больше сыграет игр с мужем/женой за команду мафии" },
    32: { text: "Кто больше убьёт игроков ночью, играя за мафиози" },
    33: { text: "Кто больше заморозит насмерть, играя за Босса мафии" },
    34: { text: "Кто больше выиграет ролей на аукционе за монеты" },
    35: { text: "Кто больше подарит мега-подарков мужу/жене" },
    37: { text: "Кто больше сыграет с мужем/женой за команду граждан" },
    38: { text: "Кто больше выиграет игр живым" },
    39: { text: "Кто больше выиграет игр единственным выжившим" },
    41: { text: "Кто выиграет больше монет в лотерейных билетах" }
};
function dateFormat(time, format = false, only_hours = false) {
    let date = new Date(time), year = date.getFullYear(), month = date.getMonth() + 1 <= 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate(), hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours(), minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
    if (only_hours) {
        return `${hours}:${minutes}`;
    }
    return `${day}.${month}.${year}${format ? ` ${hours}:${minutes}` : ''}`;
}
exports.dateFormat = dateFormat;
function KeepAlive() {
    setInterval(() => {
        let options = {
            host: 'asata-project.herokuapp.com',
            port: 80,
            path: '/'
        };
        http_1.default.get(options, res => {
            res.on('data', chunk => {
                return true;
            });
        }).on('error', err => {
            console.log('HEROKU ERROR: ', err.message);
        });
    }, 20 * 60 * 1000);
}
exports.KeepAlive = KeepAlive;
exports.helpers = {
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and: function () {
        return Array.prototype.slice.call(arguments).every(Boolean);
    },
    or: function () {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    },
    roomWaitingTimer: (duration, full = true) => roomWaitingTimer(duration, full)
};
let room_wait_interval;
function roomWaitingTimer(duration, full) {
    let timer = ((duration - +new Date) / 1000), minutes = ~~(timer / 60), seconds = ~~(timer % 60), time = `${full ? (minutes < 10 ? '0' + minutes : minutes) + ':' : ''}${(seconds < 10 ? '0' + seconds : seconds)}`;
    clearInterval(room_wait_interval);
    room_wait_interval = setInterval(() => {
        --timer;
        minutes = ~~(timer / 60);
        seconds = ~~(timer % 60);
        time = `${full ? (minutes < 10 ? '0' + minutes : minutes) + ':' : ''}${(seconds < 10 ? '0' + seconds : seconds)}`;
        if (timer <= 0) {
            clearInterval(room_wait_interval);
        }
        return time;
    }, 1000);
}
function getUrl(dir, url) {
    return path_1.default.join(dir, `${+process.env.PORT ? '../' : ''}${url}`);
}
exports.getUrl = getUrl;
