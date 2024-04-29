import { Client, Keypair } from '@huma/increment';
import { scValToNative } from '@stellar/stellar-sdk';

import { getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const increment = async () => {
  const account = Keypair.fromSecret(
    'SCQN3XGRO65BHNSWLSHYIR4B65AHLDUQ7YLHGIWQ4677AZFRS77TCZRB'
  );
  console.log('publicKey', account.publicKey());
  const incrementClient = new Client({
    contractId: 'CBA6HAKUO7VV4A757767IXMKGX7ECUT3XUFXJV2NEJTELOOLU3URNQPE',
    publicKey: account.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result } = await incrementClient.increment();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }

  // const result = await sendTransaction(
  //   'SCQN3XGRO65BHNSWLSHYIR4B65AHLDUQ7YLHGIWQ4677AZFRS77TCZRB',
  //   Network.testnet,
  //   'CBA6HAKUO7VV4A757767IXMKGX7ECUT3XUFXJV2NEJTELOOLU3URNQPE',
  //   'increment'
  // );
  // console.log('result', scValToNative(result));
};

increment();
