import { Client } from '@huma/trancheVault';

import {
  Accounts,
  findPoolMetadata,
  getCustomWallet,
  ScValType,
  toScVal
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction, simTransaction } from './utils/transaction';

export const approveLender = async (network: Network) => {
  await approveLenderByTranche(network, 'juniorTranche');
  await approveLenderByTranche(network, 'seniorTranche');
};

export const approveLenderByTranche = async (
  network: Network,
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts[tranche],
      'add_approved_lender',
      [
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }

  // const trancheClient = new Client({
  //   contractId: contracts[tranche],
  //   publicKey: Accounts.poolOwner.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(Accounts.poolOwner.secret())
  // });

  // try {
  //   const tx = await trancheClient.add_approved_lender(
  //     {
  //       caller: Accounts.poolOwner.publicKey(),
  //       lender: Accounts.poolOwner.publicKey(),
  //       reinvest_yield: true
  //     },
  //     {
  //       timeoutInSeconds: 30
  //     }
  //   );
  //   const { result } = await tx.signAndSend();
  //   console.log('result', result);
  // } catch (e) {
  //   console.error('Error', e);
  // }
};

export const deposit = async (
  network: Network,
  accountName: 'poolOwner' | 'lender',
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
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
        toScVal(100_0000000n, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const addRedemptionRequest = async (
  network: Network,
  accountName: 'poolOwner' | 'lender',
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts[accountName].secret(),
      network,
      contracts[tranche],
      'add_redemption_request',
      [
        toScVal(Accounts[accountName].publicKey(), ScValType.address),
        toScVal(10_0000000n, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const cancelRedemptionRequest = async (
  network: Network,
  accountName: 'poolOwner' | 'lender',
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts[accountName].secret(),
      network,
      contracts[tranche],
      'cancel_redemption_request',
      [
        toScVal(Accounts[accountName].publicKey(), ScValType.address),
        toScVal(10_0000000n, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const makeInitialDeposit = async (
  network: Network,
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
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
        toScVal(5000_000_000, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }

  // const trancheClient = new Client({
  //   contractId: contracts[tranche],
  //   publicKey: Accounts.poolOwner.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(Accounts.poolOwner.secret())
  // });

  // try {
  //   const tx = await trancheClient.make_initial_deposit(
  //     {
  //       caller: Accounts.poolOwner.publicKey(),
  //       assets: 5000_000_000n
  //     },
  //     {
  //       timeoutInSeconds: 30
  //     }
  //   );
  //   const { result } = await tx.signAndSend();
  //   console.log('result', result);
  // } catch (e) {
  //   console.error('Error', e);
  // }
};
