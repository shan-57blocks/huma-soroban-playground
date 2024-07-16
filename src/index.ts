import { getCreditManagerClient } from './utils/client';
import {
  Accounts,
  findPoolMetadata,
  getCustomWallet,
  ScValType,
  toScVal
} from './utils/common';
import { Network, POOL_NAME } from './utils/network';
import {
  sendTransactionWithRestoreAndExtendTTL,
  simTransaction
} from './utils/transaction';

(async () => {
  const network = Network.humanet;
  const poolName = POOL_NAME.Arf;

  const poolContracts = findPoolMetadata(network, poolName).contracts;
  const { borrower, poolOperator, ea } = Accounts[network];

  // await sendTransactionWithRestore(
  //   borrower.secret(),
  //   network,
  //   poolContracts.poolCredit,
  //   'make_payment',
  //   [
  //     toScVal(borrower.publicKey(), ScValType.address),
  //     toScVal(borrower.publicKey(), ScValType.address),
  //     toScVal(1000000000, ScValType.u128)
  //   ]
  // );

  // console.log('make_payment completed');

  // await sendTransactionWithRestore(
  //   borrower.secret(),
  //   network,
  //   poolContracts.poolCredit,
  //   'drawdown',
  //   [
  //     toScVal(borrower.publicKey(), ScValType.address),
  //     toScVal(1000000000, ScValType.u128)
  //   ]
  // );

  // await sendTransactionWithRestore(
  //   poolOperator.secret(),
  //   network,
  //   poolContracts.juniorTranche,
  //   'add_approved_lender',
  //   [
  //     toScVal(poolOperator.publicKey(), ScValType.address),
  //     toScVal(borrower.publicKey(), ScValType.address)
  //   ]
  // );

  // console.log('add_approved_lender completed');
  // try {
  //   const result = await sendTransactionWithRestoreAndExtendTTL(
  //     poolOwner.secret(),
  //     network,
  //     poolContracts.creditManager,
  //     'approve_borrower',
  //     [
  //       toScVal(poolOperator.publicKey(), ScValType.address),
  //       toScVal(1000_0000000n, ScValType.u128),
  //       toScVal(5, ScValType.u32),
  //       toScVal(1200, ScValType.u32),
  //       toScVal(0, ScValType.u128),
  //       toScVal(0, ScValType.u64),
  //       toScVal(true, ScValType.bool)
  //     ]
  //   );

  //   console.log(result);
  // } catch (e) {
  //   console.log(e);
  // }

  const creditManagerClient = getCreditManagerClient(
    network,
    poolName,
    ea.publicKey(),
    getCustomWallet(ea.secret())
  );

  const tx = await creditManagerClient.approve_borrower(
    {
      borrower: poolOperator.publicKey(),
      credit_limit: 1000_0000000n,
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

  await tx.signAndSend();
})();
