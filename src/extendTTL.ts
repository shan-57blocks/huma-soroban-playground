/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Address,
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

export const extendInstanceTTL = async () => {
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

  const account = await server.getAccount(signer.publicKey());
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
};

export const extendPersistentTTL = async () => {
  const juniorTranche =
    'CAEZEGVK2FNDQSAA7KNMMPU6BS5YVW5DMWHMBPCS3EZYVMRCECWJSWAW';
  const lender = 'GBWOHPLK53VVKNEV7C6O6IYN7X3OLHXDML6GVZBPEB7MTWWHPB3N7VLC';

  // console.log(
  //   xdr.ScVal.scvVec([
  //     xdr.ScVal.scvSymbol('ApprovedLender'),
  //     new Address(lender).toScVal()
  //   ]).toXDR('base64')
  // );

  const getLedgerKeySymbol = () => {
    const ledgerKey = xdr.LedgerKey.contractData(
      new xdr.LedgerKeyContractData({
        contract: new Address(juniorTranche).toScAddress(),
        key: xdr.ScVal.scvVec([
          xdr.ScVal.scvSymbol('ApprovedLender'),
          new Address(lender).toScVal()
        ]),
        durability: xdr.ContractDataDurability.persistent()
      })
    );
    return ledgerKey;
  };

  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const ledgerKey = getLedgerKeySymbol();

  const entries = await server.getLedgerEntries(ledgerKey);
  console.log('dddddd');
  console.log(JSON.stringify(entries));
};

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
// const getLedgerKeySymbol = (contractId: string) => {
//   const instance = new Contract(contractId).getFootprint();
//   return instance;
// };
// const keys = getLedgerKeySymbol(
//   'CDXI5L5EFHBW3KYY3D6JGXJTGDOG5EZAQUDAK5LWZQVH4TEUDAO7PBGU'
// );
// const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
// const entries = await server.getLedgerEntries(keys);
// console.log(JSON.stringify(entries));
// await approveLenderByTranche(Network.testnet, 'juniorTranche');
// decodeScValString([84, 114, 97, 110, 99, 104, 101, 73, 110, 100, 101, 120]);
// decodeScValString([
//   85, 110, 100, 101, 114, 108, 121, 105, 110, 103, 84, 111, 107, 101, 110
// ]);
// const text = xdr.ScVal.scvAddress(
//   xdr.ScAddress.fromXDR(
//     Buffer.from([
//       80, 69, 205, 94, 192, 114, 154, 118, 143, 213, 173, 2, 80, 88, 82, 223,
//       79, 2, 141, 206, 131, 14, 90, 197, 34, 9, 186, 72, 72, 59, 47, 1
//     ])
//   )
// );
// console.log('text', text);
