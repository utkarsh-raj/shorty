import { Func } from "node-worker-threads-pool/dist/types";
import { ShortenerTypes } from "../constants/common";
import shortnerFactory from "../factories/shortnerFactory";
import { ShortenerServiceInterface } from "../interfaces/ShortenerServiceInterface";

export class ShortnerService implements ShortenerServiceInterface {
    async shorten(hash: string, type: ShortenerTypes): Promise<string> {
        try {
            const shortner: Function = shortnerFactory(type);
            const shortString: string = await global.dynamicPool.exec({
                task: shortner as Func,
                param: hash
            });
            return shortString;
        } catch (err) {
            throw err;
        }
    }
}
