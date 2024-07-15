import { Accounts, findPoolMetadata, ScValType, toScVal } from './utils/common';
import { Network, POOL_NAME } from './utils/network';
import { sendTransactionWithRestore } from './utils/transaction';

(async () => {
  const network = Network.humanet;
  const poolName = POOL_NAME.Arf;

  const poolContracts = findPoolMetadata(network, poolName).contracts;
  const { borrower, poolOperator } = Accounts[network];

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

  await sendTransactionWithRestore(
    poolOperator.secret(),
    network,
    poolContracts.juniorTranche,
    'add_approved_lender',
    [
      toScVal(poolOperator.publicKey(), ScValType.address),
      toScVal(borrower.publicKey(), ScValType.address)
    ]
  );

  console.log('add_approved_lender completed');
})();
