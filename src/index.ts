/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@huma/pool';
import {
  getPoolInfo,
  setPoolSettings,
  underlyingTokenBalanceOf,
  underlyingTokenTransfer
} from './pool';
import { enablePool, getPoolManagerInfo } from './poolManager';
import { Accounts } from './utils/common';
import { approveLender, deposit, makeInitialDeposit } from './trancheVault';
import {
  getProtocolInfo,
  isProtocolPaused,
  unpauseProtocol
} from './humaConfig';

(async () => {
  // await getUnderlyingToken();
  // await setPoolSettings();
  // await approveLender();
  // await approveBorrower();
  // await drawdown();
  // await underlyingTokenTransfer();
  // await underlyingTokenBalanceOf(Accounts.lender.publicKey());
  // await unpauseProtocol();
  // await makeInitialDeposit('juniorTranche');
  // await deposit('lender', 'seniorTranche');
  // await enablePool();
  // await getPoolOwnerTreasury();
  // await getPoolManagerInfo();
  await getPoolInfo();
  // await getProtocolInfo();
})();
