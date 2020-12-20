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
exports.bestmafia = void 0;
const express_1 = __importDefault(require("express"));
const moders_1 = require("../controllers/moders");
const payments_1 = require("../controllers/payments");
const menu_1 = require("../controllers/menu");
const router = express_1.default.Router();
exports.bestmafia = router;
router.post('/moders', (req, res) => res.json(moders_1.getModersOnline()));
router.post('/pay', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield payments_1.menuPayment(req)); }));
router.post('/qiwiLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.json(yield payments_1.getQiwiLink(req)); }));
router.get('/playerIds', (req, res) => res.json({ ids: menu_1.playerIds() }));
router.get('/success_pay', (req, res) => res.send('Спасибо за покупку! Теперь можете воспользоваться скриптом на платное меню!'));
router.get('/:type.js', (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', "no-cache");
    res.header('Expires', '0');
    menu_1.verifyMenuAccess(req, res);
});
router.get('/:hash/:type.js', (req, res) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', "no-cache");
    res.header('Expires', '0');
    menu_1.botMenu(req, res);
});
