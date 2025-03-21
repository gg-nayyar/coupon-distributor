import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';
import Coupon from '../models/coupon.model';
import express, { Request, Response } from 'express';

const router = express.Router();


const authenticateAdmin = async (req: Request, res: Response, next: any):Promise<any> => {
    const Secret = process.env.SECRET_KEY as string;
    const token = req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, Secret) as { username: string, id: string };
        (req as any).admin = await Admin.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};


// router.post("/register", async (req: Request, res: Response): Promise<any> => {
//     try{
    //         const { username, password } = req.body;
    //         const existingAdmin = await Admin.findOne({ username });
    //         if (existingAdmin) {
        //             return res.status(400).json({"message": "Admin already exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newAdmin = new Admin({ username, password: hashedPassword });
//         await newAdmin.save();
//         res.status(201).json({ message: "Admin created successfully", adminId: newAdmin._id });
//     }
//     catch (error) {
//         res.status(500).send({ message: "Internal server error" });
//     }
// });

router.post("/login", async (req: Request, res: Response): Promise<any> => {
    const Secret = process.env.SECRET_KEY as string;
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
        console.log(error);
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

router.post("/coupon/add", authenticateAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon already exists" });
        }
        const newCoupon = new Coupon({ code });
        await newCoupon.save();
        res.status(201).json({ message: "Coupon added successfully", couponId: newCoupon._id });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.put("/coupon/update/:id", authenticateAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const { code, status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Coupon status is required" });
        }
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        if (code) {
            coupon.code = code;
        }
        if(status){
        coupon.status = status;
        }
        await coupon.save();
        return res.json({ message: "Coupon updated successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

router.get("/coupon/list", authenticateAdmin, async (req: Request, res: Response): Promise<any> => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default router;