import { extendInstanceTTL, restoreInstanceTTL } from './extendTTL';
import { Network, POOL_NAME } from './utils/network';

(async () => {
  const network = Network.humanet;
  const poolName = POOL_NAME.Arf;

  // const lender = 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7';
  // await approveLender(network, poolName, lender);

  await extendInstanceTTL(network, poolName);
  // await restoreInstanceTTL(network, poolName);
  // await extendPersistentTTL(network, poolName);
  // await restoreAndExtendInstanceTTL(network, poolName);
})();
