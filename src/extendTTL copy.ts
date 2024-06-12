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
  xdr
} from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata } from './utils/common';
import {
  Network,
  NetworkPassphrase,
  POOL_NAME,
  PublicRpcUrl
} from './utils/network';

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
  network: Network,
  ledgerKey: xdr.LedgerKey,
  type: 'restore' | 'extend'
) => {
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const signer = Accounts[network].poolOwner;
  const account = await server.getAccount(signer.publicKey());

  const sorobanData =
    type === 'restore'
      ? new SorobanDataBuilder().setReadWrite([ledgerKey]).build()
      : new SorobanDataBuilder().setReadOnly([ledgerKey]).build();
  const operation =
    type === 'restore'
      ? Operation.restoreFootprint({})
      : Operation.extendFootprintTtl({
          extendTo: 3110400 - 1
        });

  const tx = new TransactionBuilder(account, { fee: BASE_FEE })
    .setNetworkPassphrase(NetworkPassphrase[network])
    .setSorobanData(new SorobanDataBuilder().setReadWrite([ledgerKey]).build())
    .addOperation(Operation.restoreFootprint({}))
    .setTimeout(30)
    .build();

  const preparedTransaction = await server.prepareTransaction(tx);
  preparedTransaction.sign(signer);
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
    console.log(sendResponse.errorResult);
  }
};

export const restoreAndExtendInstanceTTL = async (
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

    // const account = await server.getAccount(signer.publicKey());
    // let tx: Transaction<Memo<MemoType>, Operation[]>;
    // if (
    //   ledgerEntries.entries[0].liveUntilLedgerSeq! < ledgerEntries.latestLedger
    // ) {
    //   tx = new TransactionBuilder(account, { fee: BASE_FEE })
    //     .setNetworkPassphrase(NetworkPassphrase[network])
    //     .setSorobanData(
    //       new SorobanDataBuilder().setReadWrite([instance]).build()
    //     )
    //     .addOperation(Operation.restoreFootprint({}))
    //     .setTimeout(30)
    //     .build();

    //   const preparedTransaction = await server.prepareTransaction(tx);
    //   preparedTransaction.sign(signer);
    //   await sendTransaction(server, preparedTransaction);
    // }

    // tx = new TransactionBuilder(account, { fee: BASE_FEE })
    //   .setNetworkPassphrase(NetworkPassphrase[network])
    //   .setSorobanData(new SorobanDataBuilder().setReadOnly([instance]).build())
    //   .addOperation(
    //     Operation.extendFootprintTtl({
    //       extendTo: 3110400 - 1
    //     })
    //   )
    //   .setTimeout(30)
    //   .build();

    // const preparedTransaction = await server.prepareTransaction(tx);
    // preparedTransaction.sign(signer);
    // await sendTransaction(server, preparedTransaction);

    await sendTransaction(network, instance, 'extend');

    ledgerEntries = await server.getLedgerEntries(instance);
    console.log(
      `${contract} liveUntilLedgerSeq after extend: `,
      ledgerEntries.entries[0].liveUntilLedgerSeq
    );
  }
};

// export const extendInstanceTTL = async (
//   network: Network,
//   poolName: POOL_NAME
// ) => {
//   const { contracts } = findPoolMetadata(network, poolName);
//   const server = new SorobanRpc.Server(PublicRpcUrl[network]);
//   const signer = Accounts[network].poolOwner;

//   for (const contract of Object.keys(contracts)) {
//     // @ts-ignore
//     const instance = new Contract(contracts[contract]).getFootprint();
//     let ledgerEntries = await server.getLedgerEntries(instance);
//     console.log('****************');
//     console.log('Current ledger number: ', ledgerEntries.latestLedger);
//     console.log(
//       `${contract} liveUntilLedgerSeq before extend: `,
//       ledgerEntries.entries[0].liveUntilLedgerSeq
//     );

//     const account = await server.getAccount(signer.publicKey());
//     const restoreTx = new TransactionBuilder(account, { fee: BASE_FEE })
//       .setNetworkPassphrase(NetworkPassphrase[network])
//       .setSorobanData(new SorobanDataBuilder().setReadOnly([instance]).build())
//       .addOperation(
//         Operation.extendFootprintTtl({
//           extendTo: 3110400 - 1
//         })
//       )
//       .setTimeout(30)
//       .build();

//     const preparedTransaction = await server.prepareTransaction(restoreTx);
//     preparedTransaction.sign(signer);
//     await sendTransaction(server, preparedTransaction);

//     ledgerEntries = await server.getLedgerEntries(instance);
//     console.log(
//       `${contract} liveUntilLedgerSeq after extend: `,
//       ledgerEntries.entries[0].liveUntilLedgerSeq
//     );
//   }
// };

export const extendPersistentTTL = async (
  network: Network,
  poolName: POOL_NAME
) => {
  const { contracts } = findPoolMetadata(network, poolName);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const signer = Accounts[network].poolOwner;

  const key = xdr.ScVal.scvVec([
    xdr.ScVal.scvSymbol('ApprovedLender'),
    new Address(Accounts[network].lender.publicKey()).toScVal()
  ]);

  const ledgerEntries = await server.getLedgerEntries(
    getLedgerKey(contracts.juniorTranche, key)
  );
  console.log('****************');
  console.log('Current ledger number: ', ledgerEntries.latestLedger);
  console.log(
    `liveUntilLedgerSeq before extend: `,
    ledgerEntries.entries[0].liveUntilLedgerSeq
  );

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
