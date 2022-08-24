import moment from "moment";
import mongoose from "mongoose";
import { MappingNotFoundInDb } from "../../common/errorClasses";
import { DbServiceInterface } from "../../interfaces/DbServiceInterface";
import UrlMapping from "../../models/MongoDB/UrlMapping.model";

require('dotenv').config();

export class MongoDBService implements DbServiceInterface {
    async connect(): Promise<void> {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI ?? 'undefined');
        }
    }

    async saveRow(originalUrl: string, shortUrl: string, createdAt: Date): Promise<void> {
        this.connect();
        const toExpireTimestamp: Date = moment().add(+(process.env.TTL ?? 3600), 'seconds').toDate();
        const mapping = new UrlMapping({
            original_url: originalUrl,
            short_url: shortUrl,
            expire_at: toExpireTimestamp
        })
        await mapping.save();
    }

    async getRow(shortUrl: string): Promise<string> {
        this.connect();
        const originalUrlObject: mongoose.Document | null = await UrlMapping.findOne({ short_url: shortUrl });
        if (originalUrlObject === null) throw new MappingNotFoundInDb('entry not found');
        const originalUrl: string  = originalUrlObject.get('original_url');
        return originalUrl;
    }
}
