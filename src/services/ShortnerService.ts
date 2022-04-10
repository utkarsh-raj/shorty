import { Func } from "node-worker-threads-pool/dist/types";
import { ShortnerTypes } from "../constants/common";
import shortnerFactory from "../factories/shortnerFactory";
import { ShortnerServiceInterface } from "../interfaces/ShortnerServiceInterface";

export class ShortnerService implements ShortnerServiceInterface {
    async shorten(hash: string, type: ShortnerTypes): Promise<string> {
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
