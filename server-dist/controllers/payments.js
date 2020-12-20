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
exports.getQiwiLink = exports.menuPayment = void 0;
const sha1_1 = __importDefault(require("sha1"));
const auxiliary_1 = require("./auxiliary");
const paid_1 = __importDefault(require("../models/paid"));
const bill_payments_node_js_sdk_1 = __importDefault(require("@qiwi/bill-payments-node-js-sdk"));
function menuPayment(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let { body, headers } = req, payment_data = {
            status: 401,
            text: 'error'
        }, { notification_type, bill } = body;
        console.log(body);
        if (notification_type) {
            console.log('yandex');
            let { error, maf_id } = yandexMoney(body);
            if (error) {
                console.log('error');
                return payment_data;
            }
            else {
                console.log('Норм, добавил пользователя', maf_id);
                let { error } = yield updateUser(maf_id);
                if (!error) {
                    payment_data.status = 200;
                    payment_data.text = 'success';
                    return payment_data;
                }
            }
        }
        else if (bill) {
            body.signature = headers['x-api-signature-sha256'];
            let { error, maf_id } = qiwiWallet(body);
            if (error) {
                return payment_data;
            }
            else {
                let { error } = yield updateUser(maf_id);
                if (!error) {
                    console.log('Dobavil');
                    payment_data.status = 200;
                    payment_data.text = 'success';
                    return payment_data;
                }
            }
        }
    });
}
exports.menuPayment = menuPayment;
function yandexMoney(data) {
    let type = data.notification_type, id = data.operation_id, time = data.datetime, secret = 'aKsFrW2qyeLVYdvScKiVCHol', { amount, currency, sender, codepro, label, sha1_hash } = data, hash = sha1_1.default(`${type}&${id}&${amount}&${currency}&${time}&${sender}&${codepro}&${secret}&${label}`), info = { error: true };
    if (hash === sha1_hash) {
        if (amount >= 110 && +label) {
            console.log('nice', amount);
            info.error = false;
            info.maf_id = +label;
        }
    }
    return info;
}
const secretKey = 'eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6InRia3pudy0wMCIsInVzZXJfaWQiOiIzNzEyOTg5NDQxOSIsInNlY3JldCI6IjRmNTQyZmZiZDM3OTVlOTQ0ODhhNGM2YThlMzFkNmNhZmU2ODk4ZmRhNWMwYWRhNWJlNWViYzQwMWM5NGYzZmYifX0=', qiwiApi = new bill_payments_node_js_sdk_1.default(secretKey);
function qiwiWallet(data) {
    var _a;
    let { signature, bill } = data, maf_id = (_a = bill === null || bill === void 0 ? void 0 : bill.customFields) === null || _a === void 0 ? void 0 : _a.maf_id, valid_payment = qiwiApi.checkNotificationSignature(signature, data, secretKey), info = { error: true };
    if (valid_payment) {
        if (+bill.amount.value >= 110 && maf_id) {
            info.error = false;
            info.maf_id = maf_id;
        }
    }
    return info;
}
function getQiwiLink(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let { maf_id } = req.body, info = { error: 0 };
        if (+maf_id) {
            const billId = qiwiApi.generateId(), fields = {
                amount: 110.00,
                currency: 'RUB',
                comment: 'Покупка бот-меню',
                expirationDateTime: qiwiApi.getLifetimeByDay(1),
                successUrl: `https://asata.top/bestmafia/success_pay`,
                customFields: {
                    maf_id: +maf_id
                }
            }, { payUrl } = yield qiwiApi.createBill(billId, fields);
            if (payUrl) {
                info.link = payUrl;
            }
            else {
                info.error = 2;
            }
        }
        else {
            info.error = 1;
        }
        return info;
    });
}
exports.getQiwiLink = getQiwiLink;
function updateUser(maf_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = +new Date, month = 2592000000, plus_month = (date + month), data = {
            maf_id: maf_id,
            duration: plus_month,
            active: true,
            bought: date,
            screen: auxiliary_1.dateFormat(plus_month, true)
        };
        let res = yield paid_1.default.findOne({ maf_id });
        if (res) {
            let { duration, buy_count } = res;
            if (buy_count) {
                if (duration < date) {
                    yield paid_1.default.updateOne({ maf_id }, Object.assign(Object.assign({}, data), { $inc: { buy_count: 1 } }));
                }
                else {
                    yield paid_1.default.updateOne({ maf_id }, {
                        enabled: true,
                        screen: auxiliary_1.dateFormat(duration + month, true),
                        $inc: {
                            duration: month,
                            buy_count: 1
                        }
                    });
                }
            }
            else {
                data.buy_count = 1;
                yield paid_1.default.updateOne({ maf_id }, data);
            }
        }
        else {
            data.buy_count = 1;
            yield new paid_1.default(data).save();
        }
        return { error: false };
    });
}
/* function interCasse(data) {
    return new Promise(resolve => {
        let sign = interkassa(data, '0SexbYBtQfxhEk0t', true).signature,
            { ik_sign, ik_x_maf_id } = data,
            info = { error: true };
        if (sign != ik_sign || +data.ik_am < 110) {
            resolve(info);
        } else {
            info.error = false;
            info.maf_id = +ik_x_maf_id;
            resolve(info);
        }
    });
} */
/*
function Payeer(data) {
    return new Promise(resolve => {
        let trusted_ip = ['185.71.65.92', '185.71.65.189', '149.202.17.210'],
            pay_data = {
                status: 401,
                text: 'BAD'
            };
        if (~trusted_ip.indexOf(data.ip)) {
            let { m_operation_id, m_sign } = data;
            if (m_operation_id) {
                let m_key = 'dN4FyAZzsNIbQJg8',
                    arr_hash = [
                        m_operation_id,
                        data.m_operation_ps,
                        data.m_operation_date,
                        data.m_operation_pay_date,
                        data.m_shop,
                        data.m_orderid,
                        data.m_amount,
                        data.m_curr,
                        data.m_desc,
                        data.m_status,
                        m_key
                    ],
                    sign_hash = sha256(arr_hash.join(':')).toUpperCase();
                if (m_sign == sign_hash && data.m_status == 'success') {
                    mongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
                        let db = client.db('userdb').collection('purchase');
                        db.findOne({ pre_id: data.m_orderid }, (req, res: any) => {
                            if (res && res.id) {
                                Update(res.id).then(res => {
                                    if (!res.error) {
                                        pay_data.status = 200;
                                        pay_data.text = `${data.m_orderid}|success`;
                                        resolve(pay_data);
                                    }
                                });
                            }
                        });
                    });
                } else {
                    pay_data.text = `${data.m_orderid}|error`;
                    resolve(pay_data);
                }
            }
        } else {
            pay_data.status = 404;
            pay_data.text = 'Error';
            resolve(pay_data);
        }
    });
}

export default function Pay(req) {
    return new Promise(resolve => {
        let data = req.body,
            pay_data = {
                status: 401,
                text: 'error'
            };
        if (typeof data.m_sign != 'undefined') {
            data.ip = req.headers['cf-connecting-ip'];
            Payeer(data).then((res: any) => {
                resolve(res);
            });
        } else if (typeof data.notification_type != 'undefined') {
            yandexMoney(data).then((res: any) => {
                if (res.error) {
                    resolve(pay_data);
                    console.log('Пoлучил ошибку при оплате с яндекс денег');
                } else {
                    Update(res.maf_id).then((data: any) => {
                        if (!data.error) {
                            console.log('Успешно добавил');
                            pay_data.status = 200;
                            pay_data.text = 'success';
                            resolve(pay_data);
                        }
                    });
                }
            });
        } else if (typeof data.bill !== 'undefined') {

        } else if (typeof data.ik_sign != 'undefined') {
            resolve(pay_data);
            interCasse(data).then((res: any) => {
                if (res.error) {
                    resolve(pay_data);
                    console.log('Пoлучил ошибку при оплате с интеркассы');
                } else {
                    Update(res.maf_id).then((data: any) => {
                        if (!data.error) {
                            console.log('Успешно добавил');
                            pay_data.status = 200;
                            pay_data.text = 'success';
                            resolve(pay_data);
                        }
                    });
                }
            });
        } else {
            resolve(pay_data);
        }
    });
}

*/
