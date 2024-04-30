import { Accounts, findPoolMetadata, ScValType, toScVal } from './utils/common';
import { Network } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const approveBorrower = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.poolCredit,
      'approve_borrower',
      [
        toScVal(Accounts.borrower.publicKey(), ScValType.address),
        toScVal(100000000000, ScValType.u128),
        toScVal(5, ScValType.u32),
        toScVal(1200, ScValType.u32),
        toScVal(0, ScValType.u128),
        toScVal(0, ScValType.u64),
        toScVal(true, ScValType.bool)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
