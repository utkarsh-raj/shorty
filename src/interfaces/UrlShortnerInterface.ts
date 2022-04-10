import { DbEngineTypes, HashTypes, ShortenerTypes } from "../constants/common"

export interface UrlShortnerInterface {
    process(originalUrl: string, hashType: HashTypes, shortenerType: ShortenerTypes, dbEngineType: DbEngineTypes): Promise<string>
    getRedirectionUrl(shortUrl: string, dbEngineType: DbEngineTypes): Promise<string>
}
