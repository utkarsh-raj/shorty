import { ShortnerTypes } from "../constants/common";

export interface ShortnerServiceInterface {
    shorten(hash: string, type: ShortnerTypes): Promise<string>;
}