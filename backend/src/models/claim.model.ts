import mongoose, { Schema, Document } from 'mongoose';

export interface IClaim extends Document {
    id: string;
    session: string;
    coupon_id: mongoose.Schema.Types.ObjectId;
    claimedAt: Date;
}

const ClaimSchema: Schema = new Schema<IClaim>({
    id: { type: String, required: true },
    session: { type: String, required: true },
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
    claimedAt: { type: Date, required: true }
});

export default mongoose.model<IClaim>('Claim', ClaimSchema);
