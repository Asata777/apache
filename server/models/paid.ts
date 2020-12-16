import mongoose, { Document, Schema } from 'mongoose';

const paidSchema = new Schema({
    maf_id: { type: Number, required: true },
    nick: String,
    active: { type: Boolean, default: true },
    buy_count: { type: Number, default: 1 },
    enc_id: String,
    duration: Number,
    bought: Number,
    screen: String,
    ids: { type: Array, required: false }
}, {
    versionKey: false
});

export interface PaidModel extends Document {
    maf_id: number,
    nick: string,
    active: boolean,
    buy_count: number,
    enc_id: string,
    duration: number,
    bought: number,
    screen: string,
    ids: number[]
}

export default mongoose.connection.useDb('bestmafia').model<PaidModel>('paid_menus', paidSchema)