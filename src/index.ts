import axios from 'axios';
import {
  extendInstanceTTL,
  extendPersistentTTL,
  restoreInstanceTTL
} from './extendTTL';
import { genContracts } from './utils/common';
import { Network, POOL_NAME } from './utils/network';

(async () => {
  const network = Network.humanet;
  const poolName = POOL_NAME.Arf;

  // const lender = 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7';
  // await approveLender(network, poolName, lender);

  // await restoreInstanceTTL(network, poolName);
  await extendInstanceTTL(network, poolName);
  // await extendPersistentTTL(network, poolName);
  // await restoreAndExtendInstanceTTL(network, poolName);
})();
