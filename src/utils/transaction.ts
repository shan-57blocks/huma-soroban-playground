import {
  Asset,
  BASE_FEE,
  Contract,
  Keypair,
  Operation,
  SorobanRpc,
  TransactionBuilder,
  xdr
} from '@stellar/stellar-sdk';

import { Network, NetworkPassphrase, PublicRpcUrl } from './network';

export const sendTransaction = async (
  sourceKey: string,
  network: Network,
  contractAddress: string,
  method: string,
  params: xdr.ScVal[] = []
) => {
  const sourceKeypair = Keypair.fromSecret(sourceKey);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const contract = new Contract(contractAddress);
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());
  const builtTransaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NetworkPassphrase[network]
  })
    .addOperation(contract.call(method, ...params))
    .setTimeout(30)
    .build();
  const preparedTransaction = await server.prepareTransaction(builtTransaction);
  preparedTransaction.sign(sourceKeypair);

  const sendResponse = await server.sendTransaction(preparedTransaction);
  if (sendResponse.status === 'PENDING') {
    let getResponse = await server.getTransaction(sendResponse.hash);
    while (getResponse.status === 'NOT_FOUND') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getResponse = await server.getTransaction(sendResponse.hash);
    }

    if (getResponse.status === 'SUCCESS') {
      if (!getResponse.resultMetaXdr) {
        throw 'Empty resultMetaXDR in getTransaction response';
      }
      const transactionMeta = getResponse.resultMetaXdr;
      return transactionMeta.v3().sorobanMeta().returnValue();
    } else {
      throw getResponse.resultXdr;
    }
  } else {
    throw sendResponse.errorResult;
  }
};

export const simTransaction = async (
  sourceKey: string,
  network: Network,
  contractAddress: string,
  method: string,
  params: xdr.ScVal[] = []
) => {
  const sourceKeypair = Keypair.fromSecret(sourceKey);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const contract = new Contract(contractAddress);
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());
  const builtTransaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: NetworkPassphrase[network]
  })
    .addOperation(contract.call(method, ...params))
    .setTimeout(30)
    .build();
  // const preparedTransaction = await server.prepareTransaction(builtTransaction);
  // preparedTransaction.sign(sourceKeypair);

  const simRes = await server.simulateTransaction(builtTransaction);
  console.log('simRes', simRes);
};

export async function createChangeTrustTransaction(
  network: Network,
  sourceKey: string
) {
  // We start by converting the asset provided in string format into a Stellar
  // Asset() object
  const trustAsset = new Asset(
    'USDC',
    'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
  );

  // Next, we setup our transaction by loading the source account from the
  // network, and initializing the TransactionBuilder.
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const sourceKeypair = Keypair.fromSecret(sourceKey);
  const sourceAccount = await server.getAccount(sourceKeypair.publicKey());

  // Chaning everything together from the `transaction` declaration means we
  // don't have to assign anything to `builtTransaction` later on. Either
  // method will have the same results.
  const transaction = new TransactionBuilder(sourceAccount, {
    networkPassphrase: NetworkPassphrase[network],
    fee: '100000'
  })
    // Add a single `changeTrust` operation (this controls whether we are
    // adding, removing, or modifying the account's trustline)
    .addOperation(
      Operation.changeTrust({
        asset: trustAsset
      })
    )
    // Before the transaction can be signed, it requires timebounds
    .setTimeout(30)
    // It also must be "built"
    .build();

  return {
    transaction: transaction.toXDR(),
    network_passphrase: NetworkPassphrase[network]
  };
}
