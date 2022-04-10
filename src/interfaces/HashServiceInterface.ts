import { HashTypes } from "../constants/common";

export interface HashServiceInterface {
    makeHash(stringToHash: string, type: HashTypes): Promise<string>;
}