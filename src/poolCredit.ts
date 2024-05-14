import { Client as PoolCreditClient } from '@huma/poolCredit';
import {
  Accounts,
  findPoolMetadata,
  ScValType,
  toScVal,
  getCustomWallet
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction, simTransaction } from './utils/transaction';

export const approveBorrower = async (network: Network) => {
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolCreditClient = new PoolCreditClient({
    contractId: contracts.poolCredit,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    ...getCustomWallet(Accounts.poolOwner.secret())
  });

  try {
    const tx = await poolCreditClient.approve_borrower(
      {
        borrower: Accounts.borrower.publicKey(),
        credit_limit: 100_0000000n,
        num_periods: 5,
        yield_bps: 1200,
        committed_amount: 0n,
        designated_start_date: 0n,
        revolving: true
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
  //     contracts.poolCredit,
  //     'approve_borrower',
  //     [
  //       toScVal(Accounts.borrower.publicKey(), ScValType.address),
  //       toScVal(100_0000000, ScValType.u128),
  //       toScVal(5, ScValType.u32),
  //       toScVal(1200, ScValType.u32),
  //       toScVal(0, ScValType.u128),
  //       toScVal(0, ScValType.u64),
  //       toScVal(true, ScValType.bool)
  //     ]
  //   );
  // } catch (e) {
  //   console.error('Error', e);
  // }
};

export const drawdown = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.borrower.secret(),
      network,
      contracts.poolCredit,
      'drawdown',
      [
        toScVal(Accounts.borrower.publicKey(), ScValType.address),
        toScVal(10_000_000_000, ScValType.u128)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
