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
const got_1 = __importDefault(require("got"));
const config_1 = __importDefault(require("config"));
const default_headers = config_1.default.get('default_headers'), default_hash = config_1.default.get('default_hash');
const httpRequest = {
    get(path, with_uri = false, headers = default_headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = with_uri ? path : `http://www.mafia-rules.net/standalone/${path}/`, { body } = yield got_1.default.get(uri, {
                headers: headers,
                responseType: with_uri ? 'json' : 'text'
            });
            return body;
        });
    },
    post(data, hash = default_hash, headers = default_headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `http://www.mafia-rules.net/standalone/${hash}/DO/${Math.random()}`, body = yield got_1.default.post(uri, {
                form: data,
                headers: headers
            }).json();
            return body;
        });
    }
};
exports.default = httpRequest;
