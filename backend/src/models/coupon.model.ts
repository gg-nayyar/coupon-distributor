import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    status: "available" | "claimed";
    assignedTo?: string;
    claimedAt?: Date;
    priority: number;
}

const CouponSchema: Schema = new Schema<ICoupon>({
    code: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ["available", "claimed"], default: "available" },
    assignedTo: { type: String },
    claimedAt: { type: Date },
    priority: { type: Number, default: 0 }
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);