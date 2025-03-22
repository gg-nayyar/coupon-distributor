import http from "http";
import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function connect(){
    mongoose.connection.once('open', () => {
        console.log('Connected to database');
    });
    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to database', err);
        return process.exit(1);
    });
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        server.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error connecting to database', error);
        return process.exit(1);
    }
}
connect();