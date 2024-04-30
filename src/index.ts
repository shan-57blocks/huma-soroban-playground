/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@huma/pool';
import {
  setPoolSettings,
  underlyingTokenBalanceOf,
  underlyingTokenTransfer
} from './pool';
import { enablePool, getPoolManagerInfo } from './poolManager';
import { Accounts } from './utils/common';
import { deposit, makeInitialDeposit } from './trancheVault';
import { isProtocolPaused, unpauseProtocol } from './humaConfig';

(async () => {
  // await getUnderlyingToken();
  // await setPoolSettings();
  //   await approveLender();
  // await approveBorrower();
  // await drawdown();
  // await underlyingTokenTransfer();
  // await underlyingTokenBalanceOf(Accounts.poolOwner.publicKey());
  // await unpauseProtocol();
  // await isProtocolPaused();
  // await makeInitialDeposit('seniorTranche');
  // await deposit('lender', 'seniorTranche');
  // await enablePool();
  // await getPoolOwnerTreasury();
  await getPoolManagerInfo();
})();
