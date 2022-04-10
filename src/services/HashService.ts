import { Func } from 'node-worker-threads-pool/dist/types';
import { HashTypes } from '../constants/common';
import hashTaskFactory from '../factories/hashTaskFactory';
import { HashServiceInterface } from '../interfaces/HashServiceInterface';

export class HashService implements HashServiceInterface {
    async makeHash(stringToHash: string, type: HashTypes) {
        try {
            const hashTask: Function = hashTaskFactory(type);
            const hashedString: string = await global.dynamicPool.exec({
                task: hashTask as Func,
                param: stringToHash
            });
            return hashedString;
        } catch (err) {
            throw err;
        }
    }
}
