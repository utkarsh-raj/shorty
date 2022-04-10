/* eslint-disable no-var */

import { DynamicPool } from "node-worker-threads-pool";

declare global {
    var dynamicPool: DynamicPool;
}

export {};
  