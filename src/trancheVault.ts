import { Client } from '@huma/trancheVault';

import {
  Accounts,
  findPoolMetadata,
  getCustomWallet,
  ScValType,
  toScVal
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const approveLender = async () => {
  await approveLenderByTranche('juniorTranche');
  await approveLenderByTranche('seniorTranche');
};

export const approveLenderByTranche = async (
  tranche: 'juniorTranche' | 'seniorTranche'
) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const trancheClient = new Client({
    contractId: contracts[tranche],
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    ...getCustomWallet(Accounts.poolOwner.secret())
  });

  try {
    const tx = await trancheClient.add_approved_lender(
      {
        caller: Accounts.poolOwner.publicKey(),
        lender: Accounts.lender.publicKey(),
        reinvest_yield: true
      },
      {
        timeoutInSeconds: 30
      }
    );
    const { result } = await tx.signAndSend();
    console.log('result', result);
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

  const trancheClient = new Client({
    contractId: contracts[tranche],
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    ...getCustomWallet(Accounts.poolOwner.secret())
  });

  try {
    const tx = await trancheClient.make_initial_deposit(
      {
        caller: Accounts.poolOwner.publicKey(),
        assets: 1000000000n
      },
      {
        timeoutInSeconds: 30
      }
    );
    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }

  // try {
  //   await sendTransaction(
  //     Accounts.poolOwner.secret(),
  //     network,
  //     contracts[tranche],
  //     'make_initial_deposit',
  //     [
  //       toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
  //       toScVal(100_000_000, ScValType.u128)
  //     ]
  //   );
  // } catch (e) {
  //   console.error('Error', e);
  // }
};
