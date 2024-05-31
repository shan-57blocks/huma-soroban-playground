import {
  Account,
  BASE_FEE,
  Contract,
  Keypair,
  Networks,
  Operation,
  SorobanDataBuilder,
  SorobanRpc,
  TransactionBuilder,
  xdr
} from '@stellar/stellar-sdk';

(async () => {
  const humaConfigContract =
    'CAHPEHOIZIIMMTFCZOYEXDKHXJZ2QDYLRD3SF2AZTXWAUV4OWKGHPDCL';
  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const signer = Keypair.fromSecret(
    'SCS43KPAQZ2J22DYMAFJQVFTPWZQ6RBYL332PEBCPBJ6ZHAF3PMR2VLC'
  );
  const instance = new Contract(humaConfigContract).getFootprint();
  const sequence = await server
    .getLatestLedger()
    .then(({ sequence }) => sequence);
  const le = await server.getLedgerEntries(instance);
  console.log('signer.publicKey()', signer.publicKey());
  const account = await server.getAccount(signer.publicKey());
  console.log(5555, sequence);
  const restoreTx = new TransactionBuilder(account, { fee: BASE_FEE })
    .setNetworkPassphrase(Networks.TESTNET)
    .setSorobanData(new SorobanDataBuilder().setReadWrite([instance]).build())
    .addOperation(
      Operation.extendFootprintTtl({
        extendTo:
          sequence + (3110400 - (le.entries[0].liveUntilLedgerSeq! - sequence))
      })
    )
    .setTimeout(30)
    .build();

  const preparedTransaction = await server.prepareTransaction(restoreTx);
  preparedTransaction.sign(signer);

  const sendResponse = await server.sendTransaction(preparedTransaction);
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
      const transactionMeta = getResponse.resultMetaXdr;
      console.log('success');
      console.log(transactionMeta.v3().sorobanMeta().returnValue());
    } else {
      throw getResponse.resultXdr;
    }
  } else {
    throw sendResponse.errorResult;
  }

  //   const rpc = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  //   const sentinelSecretKey =
  //     'SA4ZVSSCY5YY3FNHK3ERGR2O7ISMUBMPTXWFRL6SEZ5CYJ3EJQT4VJBK';
  //   const sentinelKeypair = Keypair.fromSecret(sentinelSecretKey);

  //   const source = await rpc
  //     .getAccount(sentinelKeypair.publicKey())
  //     .then((res) => new Account(res.accountId(), res.sequenceNumber()));
  //   const sequence = await rpc.getLatestLedger().then(({ sequence }) => sequence);

  //   const wasm_hash =
  //     'ffd2249433d021c6a215e08d21b834ee985e92b8e6dccb816849033fa4523ab9';

  //   const lk = xdr.LedgerKey.contractCode(
  //     new xdr.LedgerKeyContractCode({
  //       hash: Buffer.from(wasm_hash, 'hex')
  //     })
  //   );
  //   const le = await rpc.getLedgerEntries(lk);

  //   const txn = new TransactionBuilder(source, {
  //     fee: '100',
  //     networkPassphrase: Networks.TESTNET
  //   })
  //     .addOperation(
  //       Operation.extendFootprintTtl({
  //         extendTo:
  //           sequence + (3110400 - (le.entries[0].liveUntilLedgerSeq! - sequence))
  //       })
  //     )
  //     .setSorobanData(new SorobanDataBuilder().setReadOnly([lk]).build())
  //     .setTimeout(0)
  //     .build();

  //   const simTxn = await rpc.simulateTransaction(txn);

  //   if (!SorobanRpc.Api.isSimulationSuccess(simTxn)) {
  //     throw new Error('Simulation failed');
  //   }

  //   const tx = assembleTransaction(txn, simTxn).build();

  //   console.log(tx.fee);
})();
