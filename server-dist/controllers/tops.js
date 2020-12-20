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
function socketTopsConnection(io) {
    let tops_interval, last_users = [];
    io.on('connection', (socket) => {
        socket.on('message', data => {
            clearInterval(tops_interval);
            let category = data.category;
            last_users = [{}];
            if (category) {
                tops_interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    let online_tops = yield onlineTops(category), users = online_tops === null || online_tops === void 0 ? void 0 : online_tops.users, equals = compareArrays(users, last_users);
                    if (!equals) {
                        socket.emit('message', online_tops);
                        last_users = users;
                    }
                }), 1000);
            }
        });
    });
}
exports.default = socketTopsConnection;
function onlineTops(category) {
    return __awaiter(this, void 0, void 0, function* () {
        let info = [], is_love = (category === 'love_d'), { arr } = yield xhr_1.default.post({
            method: 'top_req',
            t: category
        });
        if (arr) {
            arr.forEach((e) => {
                info.push({
                    nick: (is_love ? `${e[1]} + ${e[3]}` : e[1]),
                    count: e[is_love ? 4 : 2],
                    online: (e[e.length - 1] > 0)
                });
            });
            return {
                users: info,
                category: category
            };
        }
    });
}
function compareArrays(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}
