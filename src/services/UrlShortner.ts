import moment from 'moment';
import { HashTypes, ShortenerTypes } from '../constants/common';
import { DbServiceInterface } from '../interfaces/DbServiceInterface';
import { HashServiceInterface } from '../interfaces/HashServiceInterface';
import { ShortenerServiceInterface } from '../interfaces/ShortenerServiceInterface';
import { MongoDBService } from './DbEngines/MongoDB.service';
import { HashService } from './HashService';
import { ShortnerService } from './ShortnerService';

require('dotenv').config();

export class UrlShortner {
    async process(originalUrl: string, hashType: HashTypes, shortenerType: ShortenerTypes): Promise<string> {
        try {
            // Get hashedString from makeHashService
            const hashService: HashServiceInterface = new HashService();
            const hashedString: string = await hashService.makeHash(originalUrl, hashType);
            // Call Shortner Service
            const shortnerService: ShortenerServiceInterface = new ShortnerService();
            const shortString: string = await shortnerService.shorten(hashedString, shortenerType);
            // Call saveToDb Service
            const dbService: DbServiceInterface = new MongoDBService();
            await dbService.connect();
            await dbService.saveRow(
                originalUrl,
                shortString,
                moment().toDate()
            )
            const shortUrl: string = `${process.env.HOST_NAME}/${shortString}`;
            return shortUrl;
        } catch (err) {
            throw err;
        }
    }
}
