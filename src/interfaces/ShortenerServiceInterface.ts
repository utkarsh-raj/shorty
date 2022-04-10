import { ShortenerTypes } from "../constants/common";

export interface ShortenerServiceInterface {
    shorten(hash: string, type: ShortenerTypes): Promise<string>;
}