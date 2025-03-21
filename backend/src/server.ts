import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import adminRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/admin", adminRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

