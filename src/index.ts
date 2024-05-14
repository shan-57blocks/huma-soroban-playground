/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@huma/pool';
import {
  getPoolInfo,
  setFeeStructure,
  setLpConfig,
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
import { approveToken, getAllowance } from './token';
import { Network } from './utils/network';

(async () => {
  // await getUnderlyingToken();
  // await setFeeStructure();
  // await approveBorrower();
  // await drawdown();
  // await underlyingTokenTransfer();
  // await underlyingTokenBalanceOf(
  //   'CA525T5NVARC4VHMBURM56O7EFMZ4PSMYCOTFTZPHAYQTVD2A35WFEPQ'
  // );
  // await unpauseProtocol();
  // await deposit('lender', 'juniorTranche');
  // await getPoolOwnerTreasury();
  // await getPoolManagerInfo();
  // await getProtocolInfo();
  // await setLpConfig();
  // await approveToken();
  // await getAllowance();
  // await getPoolOwnerMinLiquidityReq();
  // await getPoolInfo();
  // await enablePool();
  // await approveLender();
  // await setPoolSettings();
  await makeInitialDeposit(Network.futurenet, 'juniorTranche');
})();
