import { Client } from '@huma/poolManager';

import { Accounts, findPoolMetadata, getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';

export const getPoolOwner = async () => {
  const network = Network.Testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.Testnet,
    rpcUrl: PublicRpcUrl.Testnet,
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
  const network = Network.Testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.Testnet,
    rpcUrl: PublicRpcUrl.Testnet
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

export const addPoolOperator = async () => {
  const network = Network.Testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  console.log('Accounts.deployer.secret()', Accounts.deployer.secret());

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.deployer.publicKey(),
    networkPassphrase: NetworkPassphrase.Testnet,
    rpcUrl: PublicRpcUrl.Testnet,
    ...getCustomWallet(Accounts.deployer.secret())
  });
  try {
    const tx = await poolManager.add_pool_operator({
      addr: Accounts.poolOwner.publicKey()
    });
    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

// getPoolOwner();
// isPoolOperator();
addPoolOperator();
