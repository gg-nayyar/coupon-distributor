import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin.routes";
import couponRoutes from "./routes/coupon.routes";

const app = express();

app.use(express.json());
app.enable("trust proxy");
app.use(cors({ origin: "https://coupon-distributor-mauve.vercel.app", credentials: true }));
app.use(cookieParser());

app.use("/admin", adminRoutes);
app.use("/coupon", couponRoutes);

export default app;