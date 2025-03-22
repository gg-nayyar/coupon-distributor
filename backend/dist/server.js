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
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config({
    path: node_path_1.default.join(__dirname, '../.env')
});
const PORT = process.env.PORT || 8000;
const server = http_1.default.createServer(app_1.default);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connection.once('open', () => {
            console.log('Connected to database');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Error connecting to database', err);
            return process.exit(1);
        });
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            server.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.log('Error connecting to database', error);
            return process.exit(1);
        }
    });
}
connect();
