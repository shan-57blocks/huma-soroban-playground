import axios from 'axios';
import {
  extendInstanceTTL,
  extendPersistentTTL,
  getInstanceLedgerKeys,
  restoreInstanceTTL
} from './extendTTL';
import { genContracts } from './utils/common';
import { Network, POOL_NAME } from './utils/network';
import { Keypair } from '@stellar/stellar-sdk';

(async () => {
  const network = Network.humanet;
  const poolName = POOL_NAME.Arf;

  // console.log(
  //   Keypair.fromSecret(
  //     'SCLLKFZ2Q6ZIDQ4E6B52PDNO6ZAKXVS5DDCCSZJJTCXA4QJ3CPTG4ENH'
  //   ).publicKey()
  // );
  // return;
  // const lender = 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7';
  // await approveLender(network, poolName, lender);

  // await restoreInstanceTTL(network, poolName);
  // await extendInstanceTTL(network, poolName);
  await extendPersistentTTL(network, poolName);
  // await restoreAndExtendInstanceTTL(network, poolName);
  // await getInstanceLedgerKeys();
  // genContracts();
})();
