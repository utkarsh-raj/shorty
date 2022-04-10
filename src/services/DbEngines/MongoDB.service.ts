import moment from "moment";
import mongoose from "mongoose";
import { DbServiceInterface } from "../../interfaces/DbServiceInterface";
import UrlMapping from "../../models/MongoDB/UrlMapping.model";

require('dotenv').config();

export class MongoDBService implements DbServiceInterface {
    async connect(): Promise<void> {
        if (mongoose.connection.readyState === 0) {
            console.log(mongoose.connection.readyState)
            await mongoose.connect(process.env.MONGO_URI ?? 'undefined');
            const db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error: "));
            db.once("open", function () {
                console.log("Connected successfully");
            });
        }
    }

    async saveRow(originalUrl: string, shortUrl: string, createdAt: Date): Promise<void> {
        const currentTimestamp: Date = moment().toDate();
        const mapping = new UrlMapping({
            original_url: originalUrl,
            short_url: shortUrl,
            created_at: createdAt ?? currentTimestamp,
            accessed_at: currentTimestamp
        })
        await mapping.save();
    }
}
