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
import { Network, PublicRpcUrl } from './utils/network';
import { approveBorrower } from './poolCredit';
import { createChangeTrustTransaction } from './utils/transaction';
import { xdr, Address, Contract, SorobanRpc } from '@stellar/stellar-sdk';

import {
  POOL_NAME,
  StellarNetwork,
  StellarWallet,
  drawdown,
  makePayment
} from '@huma-shan/soroban-sdk';

(async () => {
  const wallet = new StellarWallet(
    'SB2EYCOYEITOLL5NTD5ADVHFLZWPMQCMAZ33R4FP5GS3KLG3TA63WKPO'
  );
  //100 USDC. Stellar USDC's decimal is 7
  // const borrowAmount = 10_0000000n;

  // const drawdownResult = await drawdown(
  //   POOL_NAME.Arf,
  //   StellarNetwork.localnet,
  //   wallet,
  //   borrowAmount
  // );
  // drawdownResult.sendTransactionResponse?.hash;
  // console.log(
  //   `Drawdown success. Tx hash: ${drawdownResult.sendTransactionResponse?.hash}`
  // );

  // const paymentAmount = 100_0000000n;
  // const makePaymentResult = await makePayment(
  //   POOL_NAME.Arf,
  //   StellarNetwork.localnet,
  //   wallet,
  //   paymentAmount,
  //   true
  // );
  // console.log(
  //   `Payment success. Tx hash: ${makePaymentResult.sendTransactionResponse?.hash}`
  // );

  // await getUnderlyingToken(Network.futurenet);
  // await setFeeStructure();
  // await drawdown();
  // await underlyingTokenTransfer(Network.futurenet);
  // await createChangeTrustTransaction(
  //   Network.futurenet,
  //   Accounts.lender.secret()
  // );
  // await underlyingTokenBalanceOf(
  //   Accounts.poolOwner.publicKey(),
  //   Network.futurenet
  // );
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
  // const getLedgerKeySymbol = (contractId: string, symbolText: string) => {
  //   const ledgerKey = xdr.LedgerKey.contractData(
  //     new xdr.LedgerKeyContractData({
  //       contract: new Address(contractId).toScAddress(),
  //       key: xdr.ScVal.scvSymbol(symbolText),
  //       durability: xdr.ContractDataDurability.persistent()
  //     })
  //   );
  //   return ledgerKey.toXDR('base64');
  // };
  // const key = getLedgerKeySymbol(
  //   'CCVRLKWWSYYFAEOCMLH5BT5B3SWCJSO6SMB5S3LOZ5BMKE6D6PTCXJRL',
  //   'COUNTER'
  // );
  // const requestBody = {
  //   jsonrpc: '2.0',
  //   id: 8675309,
  //   method: 'getLedgerEntries',
  //   params: {
  //     keys: [key]
  //   }
  // };
  // const res = await fetch('https://soroban-testnet.stellar.org', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(requestBody)
  // });
  // const json = await res.json();
  // console.log(JSON.stringify(json));
  // const getLedgerKeySymbol = (contractId: string, symbolText: string) => {
  //   const ledgerKey = xdr.LedgerKey.contractData(
  //     new xdr.LedgerKeyContractData({
  //       contract: new Address(contractId).toScAddress(),
  //       key: xdr.ScVal.scvSymbol(symbolText),
  //       durability: xdr.ContractDataDurability.persistent()
  //     })
  //   );
  //   return ledgerKey;
  // };
  // const keys = getLedgerKeySymbol(
  //   'CCVRLKWWSYYFAEOCMLH5BT5B3SWCJSO6SMB5S3LOZ5BMKE6D6PTCXJRL',
  //   'COUNTER'
  // );
  // const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  // const entries = await server.getLedgerEntries(keys);
  // console.log(JSON.stringify(entries));

  const getLedgerKeySymbol = (contractId: string) => {
    const instance = new Contract(contractId).getFootprint();
    return instance;
  };
  const keys = getLedgerKeySymbol(
    'CAKPKH2G3ALGKW2E5BJFUJ6WR3RXJVGIXEAPVI5S6Q4HKSDCMKEYJSBR'
  );
  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const entries = await server.getLedgerEntries(keys);
  console.log(JSON.stringify(entries));
})();
