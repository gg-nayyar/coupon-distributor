import e from 'express';
import mongoose , { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const AdminSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);