import axios from 'axios';
import {
  extendInstanceTTL,
  extendPersistentTTL,
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
  //     'SCI4G3HRJO2OEP464IDYENTBMKBT3PDFYEK5RSVRO35ECL6X3VQ4EJOS'
  //   ).publicKey()
  // );
  // return;
  // const lender = 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7';
  // await approveLender(network, poolName, lender);

  // await restoreInstanceTTL(network, poolName);
  // await extendInstanceTTL(network, poolName);
  await extendPersistentTTL(network, poolName);
  // await restoreAndExtendInstanceTTL(network, poolName);
  // genContracts();
})();
