/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@huma/pool';
import {
  getPoolInfo,
  getUnderlyingToken,
  setFeeStructure,
  setLpConfig,
  setPoolSettings,
  underlyingTokenBalanceOf,
  underlyingTokenTransfer
} from './pool';
import { enablePool, getPoolManagerInfo } from './poolManager';
import { Accounts, decodeScValString } from './utils/common';
import {
  addRedemptionRequest,
  approveLender,
  cancelRedemptionRequest,
  deposit,
  makeInitialDeposit
} from './trancheVault';
import {
  getProtocolInfo,
  isProtocolPaused,
  unpauseProtocol
} from './humaConfig';
import { approveToken, getAllowance } from './token';
import { Network } from './utils/network';
import { approveBorrower } from './poolCredit';
import { createChangeTrustTransaction } from './utils/transaction';

(async () => {
  // await getUnderlyingToken(Network.futurenet);
  // await setFeeStructure();
  // await drawdown();
  // await underlyingTokenTransfer(Network.futurenet);
  // await createChangeTrustTransaction(
  //   Network.futurenet,
  //   Accounts.lender.secret()
  // );
  await underlyingTokenBalanceOf(
    Accounts.lender.publicKey(),
    Network.futurenet
  );
  // await unpauseProtocol();
  // await getPoolOwnerTreasury();
  // await getPoolManagerInfo();
  // await getProtocolInfo();
  // await setLpConfig(Network.futurenet);
  // await approveToken();
  // await getAllowance();
  // await getPoolOwnerMinLiquidityReq();
  // await enablePool(Network.futurenet);
  // await approveLender(Network.futurenet);
  // await setPoolSettings();
  // await makeInitialDeposit(Network.futurenet, 'seniorTranche');
  // await getPoolInfo(Network.futurenet);
  // await deposit(Network.futurenet, 'poolOwner', 'juniorTranche');
  // await addRedemptionRequest(Network.futurenet, 'poolOwner', 'juniorTranche');
  // await cancelRedemptionRequest(
  //   Network.futurenet,
  //   'poolOwner',
  //   'juniorTranche'
  // );
  // await approveBorrower(Network.futurenet);
  // decodeScValString();
})();
