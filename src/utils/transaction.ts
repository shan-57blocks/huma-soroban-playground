import {
  BASE_FEE,
  Contract,
  Keypair,
  Operation,
  SorobanRpc,
  TransactionBuilder,
  xdr
} from '@stellar/stellar-sdk';

import { Network, NetworkPassphrase, PublicRpcUrl } from './network';

const handlePendingTransaction = async (
  sendResponse: SorobanRpc.Api.SendTransactionResponse,
  server: SorobanRpc.Server
) => {
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
  const account = await server.getAccount(sourceKeypair.publicKey());
  const builtTransaction = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NetworkPassphrase[network]
  })
    .addOperation(contract.call(method, ...params))
    .setTimeout(30)
    .build();

  return server.simulateTransaction(builtTransaction);
};

export const restoreTransaction = async (
  sourceKey: string,
  network: Network,
  simResponse: SorobanRpc.Api.SimulateTransactionResponse
) => {
  const sourceKeypair = Keypair.fromSecret(sourceKey);
  const server = new SorobanRpc.Server(PublicRpcUrl[network]);
  const account = await server.getAccount(sourceKeypair.publicKey());

  const restoreNeeded = SorobanRpc.Api.isSimulationRestore(simResponse);
  if (restoreNeeded) {
    const { restorePreamble } = simResponse;
    const builtTransaction = new TransactionBuilder(account, {
      networkPassphrase: NetworkPassphrase[network],
      fee: restorePreamble.minResourceFee
    })
      .setSorobanData(restorePreamble.transactionData.build())
      .addOperation(Operation.restoreFootprint({}))
      .setTimeout(30)
      .build();

    const preparedTransaction =
      await server.prepareTransaction(builtTransaction);
    preparedTransaction.sign(sourceKeypair);

    const response = await server.sendTransaction(preparedTransaction);
    const result = await handlePendingTransaction(response, server);
    console.log('Restore transaction successfully: ', response.hash);
    return result;
  }
};

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
  return handlePendingTransaction(sendResponse, server);
};

export const sendTransactionWithRestore = async (
  sourceKey: string,
  network: Network,
  contractAddress: string,
  method: string,
  params: xdr.ScVal[] = []
) => {
  const simResponse = await simTransaction(
    sourceKey,
    network,
    contractAddress,
    method,
    params
  );
  await restoreTransaction(sourceKey, network, simResponse);
  return await sendTransaction(
    sourceKey,
    network,
    contractAddress,
    method,
    params
  );
};
