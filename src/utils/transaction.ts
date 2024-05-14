import {
  BASE_FEE,
  Contract,
  Keypair,
  SorobanRpc,
  TransactionBuilder,
  xdr
} from '@stellar/stellar-sdk';

import fs from 'fs';

import { Network, NetworkPassphrase, PublicRpcUrl } from './network';
import { gasReport } from './gasReport';
import { cmd } from './common';

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
  const preparedTransaction = await server.prepareTransaction(builtTransaction);
  preparedTransaction.sign(sourceKeypair);

  const simRes = await server.simulateTransaction(preparedTransaction);

  if (SorobanRpc.Api.isSimulationSuccess(simRes)) {
    const path = `${process.cwd()}/src/utils/gas.json`;
    const report = gasReport(simRes);
    const gas = JSON.parse(
      fs.readFileSync(path, {
        encoding: 'utf-8'
      }) || '{}'
    );

    // @ts-ignore
    gas[method] = report;
    fs.writeFileSync(path, JSON.stringify(gas));
    console.log(gasReport(simRes));
    await cmd('prettier --write src/utils/gas.json');
  }
};
