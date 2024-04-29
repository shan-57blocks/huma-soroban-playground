import { Address, xdr } from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata } from './utils/common';
import { Network } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const approveLender = async () => {
  // await approveLenderByTranche('juniorTranche');
  await approveLenderByTranche('seniorTranche');
};

export const approveLenderByTranche = async (
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts[tranche],
      'add_approved_lender',
      [
        Address.fromString(Accounts.poolOwner.publicKey()).toScVal(),
        Address.fromString(Accounts.lender.publicKey()).toScVal(),
        xdr.ScVal.scvBool(true)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
