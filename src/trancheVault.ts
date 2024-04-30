import { Address, xdr } from '@stellar/stellar-sdk';

import { Accounts, ScValType, findPoolMetadata, toScVal } from './utils/common';
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

export const deposit = async (
  accountName: 'poolOwner' | 'lender',
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts[accountName].secret(),
      network,
      contracts[tranche],
      'deposit',
      [
        toScVal(Accounts[accountName].publicKey(), ScValType.address),
        toScVal(100_000_000, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const makeInitialDeposit = async (
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
      'make_initial_deposit',
      [
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
        toScVal(100_000_000, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
