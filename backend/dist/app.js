"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const coupon_routes_1 = __importDefault(require("./routes/coupon.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use("/admin", admin_routes_1.default);
app.use("/coupon", coupon_routes_1.default);
exports.default = app;
