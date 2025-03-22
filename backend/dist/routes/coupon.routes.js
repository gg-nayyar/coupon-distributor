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
const claim_model_1 = __importDefault(require("../models/claim.model"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const coupon_model_1 = __importDefault(require("../models/coupon.model"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 1,
    message: "Only 1 claim allowed per 10 minutes",
});
router.post("/claim", limiter, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIp = req.ip;
        let userSession = req.cookies.sessionId;
        let existingSession = yield claim_model_1.default.findOne({ ip: userIp });
        if (existingSession) {
            userSession = existingSession.session;
        }
        else {
            userSession = Math.random().toString(36).slice(2, 11);
            const newSession = new claim_model_1.default({ ip: userIp, session: userSession });
            yield newSession.save();
        }
        const coupon = yield coupon_model_1.default.findOne({ status: "available" }).sort({ priority: 1 });
        if (!coupon) {
            return res.status(400).json({ message: "No coupons available" });
        }
        coupon.status = "claimed";
        coupon.assignedTo = userIp;
        coupon.claimedAt = new Date();
        coupon.priority += 1;
        yield coupon.save();
        yield claim_model_1.default.updateOne({ session: userSession }, { coupon_id: coupon._id, claimedAt: new Date() }, { upsert: true });
        res
            .cookie("sessionId", userSession, { httpOnly: true })
            .json({
            message: "Coupon claimed successfully",
            couponCode: coupon.code,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
}));
exports.default = router;
