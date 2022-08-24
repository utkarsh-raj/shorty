import moment from 'moment';
import { DbEngineTypes, HashTypes, ShortenerTypes } from '../constants/common';
import dbEngineFactory from '../factories/dbEngineFactory';
import { DbServiceInterface } from '../interfaces/DbServiceInterface';
import { HashServiceInterface } from '../interfaces/HashServiceInterface';
import { ShortenerServiceInterface } from '../interfaces/ShortenerServiceInterface';
import { UrlShortnerInterface } from '../interfaces/UrlShortnerInterface';
import { HashService } from './HashService';
import { ShortnerService } from './ShortnerService';

require('dotenv').config();

export class UrlShortner implements UrlShortnerInterface {
    async process(originalUrl: string, hashType: HashTypes, shortenerType: ShortenerTypes, dbEngineType: DbEngineTypes): Promise<string> {
        const hashService: HashServiceInterface = new HashService();
        const shortnerService: ShortenerServiceInterface = new ShortnerService();
        const dbService: DbServiceInterface = dbEngineFactory(dbEngineType);
        // Get hashedString from makeHashService
        const hashedString: string = await hashService.makeHash(originalUrl, hashType);
        // Call Shortner Service
        const shortString: string = await shortnerService.shorten(hashedString, shortenerType);
        // Call saveToDb Service
        await dbService.saveRow(
            originalUrl,
            shortString,
            moment().toDate()
        )
        const shortUrl: string = `${process.env.HOST_NAME}/v1/${shortString}`;
        return shortUrl;
    }

    async getRedirectionUrl(shortUrl: string, dbEngineType: DbEngineTypes): Promise<string> {
        const dbService: DbServiceInterface = dbEngineFactory(dbEngineType);
        const originalUrl: string = await dbService.getRow(shortUrl);
        return originalUrl.indexOf('://') > -1 ? originalUrl : `https://${originalUrl}`;
    }
}
