"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.main = router;
router.get('*', (req, res) => {
    // res.sendFile(getUrl(__dirname, '../../dist/index.html'));
    res.send('testsa');
});
