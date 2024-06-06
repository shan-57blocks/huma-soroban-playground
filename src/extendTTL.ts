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
  console.log(JSON.stringify(entries));
};
