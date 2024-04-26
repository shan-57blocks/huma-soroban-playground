import { Client, Keypair } from '@huma/increment';

import { getCustomWallet } from './utils/common';
import { NetworkPassphrase, PublicRpcUrl } from './utils/network';

export const increment = async () => {
  const account = Keypair.fromSecret(
    'SCQN3XGRO65BHNSWLSHYIR4B65AHLDUQ7YLHGIWQ4677AZFRS77TCZRB'
  );
  console.log('publicKey', account.publicKey());
  const incrementClient = new Client({
    contractId: 'CBA6HAKUO7VV4A757767IXMKGX7ECUT3XUFXJV2NEJTELOOLU3URNQPE',
    publicKey: account.publicKey(),
    networkPassphrase: NetworkPassphrase.Testnet,
    rpcUrl: PublicRpcUrl.Testnet,
    ...getCustomWallet(account.secret())
  });
  try {
    const tx = await incrementClient.increment();
    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

increment();
