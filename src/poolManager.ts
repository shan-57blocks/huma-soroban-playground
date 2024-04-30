import { Client } from '@huma/poolManager';
import { Address } from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata, getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const getPoolOwner = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...getCustomWallet(Accounts.lender.secret())
  });
  try {
    const { result } = await poolManager.get_pool_owner();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

export const isPoolOperator = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result } = await poolManager.is_pool_operator({
      addr: Accounts.poolOwner.publicKey()
    });
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

export const addPoolOperator = async (operator: string) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.poolManager,
      'add_pool_operator',
      [Address.fromString(operator).toScVal()]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
