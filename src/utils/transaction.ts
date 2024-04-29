import {
  BASE_FEE,
  Contract,
  Keypair,
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
  try {
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
    const preparedTransaction = await server.prepareTransaction(
      builtTransaction
    );
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
          const errorMessage = 'Empty resultMetaXDR in getTransaction response';
          console.log(`Transaction failed: ${errorMessage}`);
          throw errorMessage;
        }
        const transactionMeta = getResponse.resultMetaXdr;
        return transactionMeta.v3().sorobanMeta().returnValue();
      } else {
        console.log(`Transaction failed: ${getResponse.resultXdr}`);
        throw getResponse.resultXdr;
      }
    } else {
      console.log(`Transaction failed: ${sendResponse.errorResult}`);
      throw sendResponse.errorResult;
    }
  } catch (err) {
    console.log(`Transaction failed: ${err}`);
    throw err;
  }
};
