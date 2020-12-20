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
exports.mafia = void 0;
const express_1 = __importDefault(require("express"));
// import { Mafia } from 'server/protected/mafia/main';
const router = express_1.default.Router();
exports.mafia = router;
/* router.get('/mafia', async (req, res) => {
    Mafia(req.body).then(data => res.json(data));
}); */
router.get('/mafia/vk_auth/:hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*axios.get(`https://oauth.vk.com/access_token?client_id=7249229&redirect_uri=http://localhost:8080/mafia/vk_auth/123abc&client_secret=I9nb0VYeRRhJ4yjQsMPw&code=${req.query.code}`)
       .then(res => console.log(res.data));
   req.query.type = 'vk_auth';
   const hash = req.params.hash;
   console.log(req.query, hash);
   // res.render('vk_auth');
   Mafia(req.query).then(data => {
       console.log(data);
       res.redirect(`/mafia/${hash}/`);
   }); */
}));
