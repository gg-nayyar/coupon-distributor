import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin, { IAdmin } from '../models/admin.model';
import express, { Request, Response } from 'express';

const router = express.Router();

const Secret = process.env.JWT_SECRET as string;

router.post("/register", async (req: Request, res: Response): Promise<any> => {
    try{
        const { username, password } = req.body;
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({"message": "Admin already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", adminId: newAdmin._id });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    try {
        const { username, password } = req.body;
        const existingAdmin = await Admin.findOne({ username });
        if (!existingAdmin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ username: existingAdmin.username, id: existingAdmin._id }, Secret, { expiresIn: "24h" });
        res.cookie("adminToken", token, { httpOnly: true }).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post("logout", async (req: Request, res: Response) => {
    try {
        res.clearCookie("adminToken").json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" }); 
}
});

export default router;