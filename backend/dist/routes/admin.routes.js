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
exports.authenticateAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const coupon_model_1 = __importDefault(require("../models/coupon.model"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const Secret = process.env.SECRET_KEY;
    let token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer "))
        ? req.headers.authorization.split(" ")[1]
        : req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, Secret);
        req.admin = yield admin_model_1.default.findById(decoded.id);
        if (!req.admin) {
            return res.status(401).json({ message: "Unauthorized: Admin not found" });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
});
exports.authenticateAdmin = authenticateAdmin;
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
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Secret = process.env.SECRET_KEY;
    try {
        const { username, password } = req.body;
        const existingAdmin = yield admin_model_1.default.findOne({ username });
        if (!existingAdmin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ username: existingAdmin.username, id: existingAdmin._id }, Secret, { expiresIn: "24h" });
        res.cookie("adminToken", token, { httpOnly: true });
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("adminToken", { httpOnly: true, secure: true });
        return res.status(200).json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}));
router.post("/coupon/add", exports.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }
        const existingCoupon = yield coupon_model_1.default.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ message: "Coupon already exists" });
        }
        const newCoupon = new coupon_model_1.default({ code });
        yield newCoupon.save();
        res.status(201).json({ message: "Coupon added successfully", couponId: newCoupon._id });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
router.put("/coupon/update/:id", exports.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { code, status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Coupon status is required" });
        }
        const coupon = yield coupon_model_1.default.findById(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        if (code) {
            coupon.code = code;
        }
        if (status) {
            coupon.status = status;
        }
        yield coupon.save();
        return res.json({ message: "Coupon updated successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
router.delete("/coupon/delete/:id", exports.authenticateAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const coupon = yield coupon_model_1.default.findById(id);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        yield coupon_model_1.default.findByIdAndDelete(id);
        res.json({ success: true, message: "Coupon deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting coupon:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/coupon/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coupons = yield coupon_model_1.default.find();
        res.json(coupons);
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
router.get("/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        console.log(token);
        console.log(decoded);
        if (typeof decoded !== "string" && decoded.username === "admin") {
            return res.json({ success: true, token });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}));
exports.default = router;
