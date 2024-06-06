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
import {
  Accounts,
  decodeScValString,
  genContracts,
  genKeypairFromMnemonic
} from './utils/common';
import {
  addRedemptionRequest,
  approveLender,
  approveLenderByTranche,
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
import { Network, PublicRpcUrl } from './utils/network';
import { approveBorrower } from './poolCredit';
import { createChangeTrustTransaction } from './utils/transaction';
import {
  xdr,
  Address,
  Contract,
  SorobanRpc,
  Keypair,
  scValToNative
} from '@stellar/stellar-sdk';

import {
  POOL_NAME,
  StellarNetwork,
  StellarWallet,
  drawdown,
  makePayment
} from '@huma-shan/soroban-sdk';
import { extendPersistentTTL } from './extendTTL';

(async () => {
  await extendPersistentTTL();
})();
