import mongoose, { Schema, Document } from 'mongoose';

export interface IClaim extends Document {
    ip: string;
    session: string;
    coupon_id: mongoose.Schema.Types.ObjectId;
    claimedAt: Date;
}

const ClaimSchema: Schema = new Schema<IClaim>({
    ip: { type: String, required: true },
    session: { type: String, required: true, unique: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'},
    claimedAt: { type: Date}
});

export default mongoose.model<IClaim>('Claim', ClaimSchema);
