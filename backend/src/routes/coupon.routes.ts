import Claim from "../models/claim.model";
import rateLimit from "express-rate-limit";
import Coupon from "../models/coupon.model";
import express, { Request, Response } from "express";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1,
  message: "Only 1 claim allowed per 10 minutes",
});

router.post(
  "/claim",
  limiter,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userIp = req.ip!;
      let userSession = req.cookies.sessionId;

      let existingSession = await Claim.findOne({ ip: userIp });
      if (existingSession) {
        userSession = existingSession.session;
      } else {
        userSession = Math.random().toString(36).slice(2, 11);
        const newSession = new Claim({ ip: userIp, session: userSession });
        await newSession.save();
      }

      const coupon = await Coupon.findOne({ status: "available" }).sort({ priority: 1 });

    if (!coupon) {
      return res.status(400).json({ message: "No coupons available" });
    }

    coupon.status = "claimed";
    coupon.assignedTo = userIp;
    coupon.claimedAt = new Date();
    coupon.priority += 1;
      await coupon.save();

      await Claim.updateOne(
        { session: userSession },
        { coupon_id: coupon._id, claimedAt: new Date() },
        { upsert: true }
      );

      res
        .cookie("sessionId", userSession, { httpOnly: true })
        .json({
          message: "Coupon claimed successfully",
          couponCode: coupon.code,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export default router;
