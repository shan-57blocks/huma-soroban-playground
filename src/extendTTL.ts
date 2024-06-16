/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Address,
  BASE_FEE,
  Contract,
  Memo,
  MemoType,
  Operation,
  SorobanDataBuilder,
  SorobanRpc,
  Transaction,
  TransactionBuilder,
  scValToNative,
  xdr
} from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata } from './utils/common';
import {
  Network,
  NetworkPassphrase,
  POOL_NAME,
  PublicRpcUrl
} from './utils/network';
import { getCreditStorageClient, getPoolStorageClient } from './utils/client';

const getLedgerKey = (contract: string, key: xdr.ScVal) => {
  const ledgerKey = xdr.LedgerKey.contractData(
    new xdr.LedgerKeyContractData({
      contract: new Address(contract).toScAddress(),
      key: key,
      durability: xdr.ContractDataDurability.persistent()
    })
  );
  return ledgerKey;
};

const sendTransaction = async (
  server: SorobanRpc.Server,
  tx: Transaction<Memo<MemoType>, Operation[]>
) => {
  const sendResponse = await server.sendTransaction(tx);
  if (sendResponse.status === 'PENDING') {
    let getResponse = await server.getTransaction(sendResponse.hash);
    while (getResponse.status === 'NOT_FOUND') {
      console.log('NOT FOUND');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await server.getTransaction(sendResponse.hash);
    }

    if (getResponse.status === 'SUCCESS') {
      if (!getResponse.resultMetaXdr) {
        throw 'Empty resultMetaXDR in getTransaction response';
      }
      console.log('success');
    } else {
      throw getResponse.resultXdr;
    }
  } else {
    throw sendResponse.errorResult;
  }
};

export const restoreInstanceTTL = async (
  network: Network,
  poolName: POOL_NAME
) => {
  const { contracts } = findPoolMetadata(network, poolName);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const signer = Accounts[network].poolOwner;

  for (const contract of Object.keys(contracts)) {
    // @ts-ignore
    const instance = new Contract(contracts[contract]).getFootprint();
    let ledgerEntries = await server.getLedgerEntries(instance);
    console.log('****************');
    console.log('Current ledger number: ', ledgerEntries.latestLedger);
    console.log(
      `${contract} liveUntilLedgerSeq before restore: `,
      ledgerEntries.entries[0].liveUntilLedgerSeq
    );

    const account = await server.getAccount(signer.publicKey());
    const tx = new TransactionBuilder(account, { fee: BASE_FEE })
      .setNetworkPassphrase(NetworkPassphrase[network])
      .setSorobanData(new SorobanDataBuilder().setReadWrite([instance]).build())
      .addOperation(Operation.restoreFootprint({}))
      .setTimeout(30)
      .build();

    const preparedTransaction = await server.prepareTransaction(tx);
    preparedTransaction.sign(signer);
    await sendTransaction(server, preparedTransaction);

    ledgerEntries = await server.getLedgerEntries(instance);
    console.log(
      `${contract} liveUntilLedgerSeq after restore: `,
      ledgerEntries.entries[0].liveUntilLedgerSeq
    );
  }
};

export const extendInstanceTTL = async (
  network: Network,
  poolName: POOL_NAME
) => {
  const { contracts } = findPoolMetadata(network, poolName);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const signer = Accounts[network].poolOwner;

  for (const contract of Object.keys(contracts)) {
    // @ts-ignore
    const instance = new Contract(contracts[contract]).getFootprint();
    let ledgerEntries = await server.getLedgerEntries(instance);
    console.log('****************');
    console.log('Current ledger number: ', ledgerEntries.latestLedger);
    console.log(
      `${contract} liveUntilLedgerSeq before extend: `,
      ledgerEntries.entries[0].liveUntilLedgerSeq
    );

    const account = await server.getAccount(signer.publicKey());
    const restoreTx = new TransactionBuilder(account, { fee: BASE_FEE })
      .setNetworkPassphrase(NetworkPassphrase[network])
      .setSorobanData(new SorobanDataBuilder().setReadOnly([instance]).build())
      .addOperation(
        Operation.extendFootprintTtl({
          extendTo: 3110400 - 1
        })
      )
      .setTimeout(30)
      .build();

    const preparedTransaction = await server.prepareTransaction(restoreTx);
    preparedTransaction.sign(signer);
    await sendTransaction(server, preparedTransaction);

    ledgerEntries = await server.getLedgerEntries(instance);
    console.log(
      `${contract} liveUntilLedgerSeq after extend: `,
      ledgerEntries.entries[0].liveUntilLedgerSeq
    );
  }
};

export const getLedgers = async (network: Network, poolName: POOL_NAME) => {
  const { contracts, borrowers } = findPoolMetadata(network, poolName);

  const poolStorageClient = getPoolStorageClient(
    network,
    poolName,
    Accounts[network].poolOwner.publicKey()
  );
  const creditStorageClient = getCreditStorageClient(
    network,
    poolName,
    Accounts[network].poolOwner.publicKey()
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};

  // humaConfig
  // const { result: underlyingToken } =
  //   await poolStorageClient.get_underlying_token();
  // result.humaConfig = [
  //   {
  //     symbol: 'Pauser',
  //     address: Accounts[network].humaOwner.publicKey()
  //   },
  //   {
  //     symbol: 'ValidLiquidityAsset',
  //     address: underlyingToken
  //   }
  // ];

  // // poolStorage
  // result.poolStorage = [
  //   {
  //     symbol: 'PoolOperator',
  //     address: Accounts[network].poolOperator.publicKey()
  //   }
  // ];

  // creditStorage
  result.creditStorage = [];
  for (const borrower of borrowers) {
    const { result: creditHash } = await creditStorageClient.get_credit_hash({
      borrower
    });

    result.creditStorage.push({
      symbol: 'CreditConfig',
      address: creditHash
    });
  }

  return result;
};

export const extendPersistentTTL = async (
  network: Network,
  poolName: POOL_NAME
) => {
  const { contracts } = findPoolMetadata(network, poolName);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const signer = Accounts[network].poolOwner;

  // const key = xdr.ScVal.scvVec([
  //   xdr.ScVal.scvSymbol('UnderlyingToken'),
  //   new Address(
  //     'CDNSM7KR4QPK7ASBJLQKA4HIA3EWVNHKWZQH2NMVFDXW2H77UZCMWOHX'
  //   ).toScVal()
  // ]);

  // const instance = new Contract(contracts.poolStorage).getFootprint();

  // const ledgerEntries = await server.getLedgerEntries(
  //   // @ts-ignore
  //   // getLedgerKey(contracts.poolStorage, key)
  //   instance
  // );

  // console.log('****************');
  // console.log('ledger', JSON.stringify(ledgerEntries));

  // return;

  const ledgers = await getLedgers(network, poolName);
  for (const contract of Object.keys(ledgers)) {
    // @ts-ignore
    for (const ledger of ledgers[contract]) {
      console.log('****************');
      console.log('ledger', ledger);
      const key = xdr.ScVal.scvVec([
        xdr.ScVal.scvSymbol(ledger.symbol),
        xdr.ScVal.scvBytes(ledger.address)
        // new Address(ledger.address).toScVal()
      ]);

      const ledgerEntries = await server.getLedgerEntries(
        // @ts-ignore
        getLedgerKey(contracts[contract], key)
      );
      if (ledgerEntries.entries.length > 0) {
        console.log('ledger entries: ', ledgerEntries);
        console.log('Current ledger number: ', ledgerEntries.latestLedger);
        console.log(
          `liveUntilLedgerSeq before extend: `,
          ledgerEntries.entries[0]?.liveUntilLedgerSeq
        );
      } else {
        console.log(`No ledger entries for ${contract} ${ledger.symbol}`);
      }
    }
  }

  // for (const contract of Object.keys(contracts)) {
  //   // @ts-ignore
  //   const instance = new Contract(contracts[contract]).getFootprint();
  //   let ledgerEntries = await server.getLedgerEntries(instance);
  //   console.log('****************');
  //   console.log('Current ledger number: ', ledgerEntries.latestLedger);
  //   console.log(
  //     `${contract} liveUntilLedgerSeq before extend: `,
  //     ledgerEntries.entries[0].liveUntilLedgerSeq
  //   );

  //   const account = await server.getAccount(signer.publicKey());
  //   const restoreTx = new TransactionBuilder(account, { fee: BASE_FEE })
  //     .setNetworkPassphrase(NetworkPassphrase[network])
  //     .setSorobanData(new SorobanDataBuilder().setReadOnly([instance]).build())
  //     .addOperation(
  //       Operation.extendFootprintTtl({
  //         extendTo: 3110400 - 1
  //       })
  //     )
  //     .setTimeout(30)
  //     .build();

  //   const preparedTransaction = await server.prepareTransaction(restoreTx);
  //   preparedTransaction.sign(signer);
  //   await sendTransaction(server, preparedTransaction);

  //   ledgerEntries = await server.getLedgerEntries(instance);
  //   console.log(
  //     `${contract} liveUntilLedgerSeq after extend: `,
  //     ledgerEntries.entries[0].liveUntilLedgerSeq
  //   );
  // }
};

export const getInstanceLedgerKeys = async () => {
  const rpc = new SorobanRpc.Server(PublicRpcUrl.humanet);
  const { val, liveUntilLedgerSeq } = await rpc.getContractData(
    'CBWVXH4CYWQFDAI26FQFSEMDPJUMNZ3RVIJWJXVFK4N3CB563Q6HMF7S',
    xdr.ScVal.scvLedgerKeyContractInstance()
  );

  console.log('liveUntilLedgerSeq', liveUntilLedgerSeq);

  val
    .contractData()
    .val()
    .instance()
    .storage()
    ?.forEach((entry) => {
      if (scValToNative(entry.key())[0] === 'UnderlyingToken') {
        console.log('*******************');
        // console.log(Buffer.from(scval(entry)).toString('base64'));
      }
    });
};
