import mongoose, { Document, Schema } from 'mongoose';

const freeSchema = new Schema({
    maf_id: { type: Number, required: true },
    nick: { type: String, required: true },
    active: { type: Boolean, default: true },
    count: { type: Number, default: 1 },
    registered: { type: Date, default: Date.now },
    activity: { type: Date, default: Date.now },
    enc_id: { type: String, required: true },
    account: {
        active: Boolean,
        hash: String,
        headers: Object
    }
}, {
    versionKey: false
});

export interface FreeModel extends Document {
    maf_id: number,
    nick: string,
    active: boolean,
    count: number,
    registered: string,
    activity: Date,
    enc_id: string,
    account: FreeAccountModel
}

export interface FreeAccountModel {
    active?: boolean,
    hash?: string,
    headers?: {
        'X-Forwarded-For': string,
        'User-Agent': string
    }
}

export default mongoose.connection.useDb('bestmafia').model<FreeModel>('free_menus', freeSchema)