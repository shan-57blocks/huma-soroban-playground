/* eslint-disable @typescript-eslint/no-unused-vars */
import { extendInstanceTTL, extendPersistentTTL } from './extendTTL';
import { setLiquidityAsset } from './humaConfig';
import { Accounts, findPoolMetadata } from './utils/common';
import { Network } from './utils/network';

(async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
})();
