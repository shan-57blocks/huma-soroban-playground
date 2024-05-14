import { Client as PoolManagerClient } from '@huma/poolManager';
import { Address } from '@stellar/stellar-sdk';

import {
  Accounts,
  findPoolMetadata,
  getCustomWallet,
  ScValType,
  toScVal,
  Wallet
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction, simTransaction } from './utils/transaction';

export const getPoolManagerClient = (sender: string, wallet?: Wallet) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  return new PoolManagerClient({
    contractId: contracts.poolManager,
    publicKey: sender,
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...(wallet || {})
  });
};

export const getPoolManagerInfo = async () => {
  const poolManagerClient = getPoolManagerClient(
    Accounts.poolOwner.publicKey()
  );

  const [
    { result: poolOwner },
    { result: poolOwnerTreasury },
    { result: isPoolOperator }
  ] = await Promise.all([
    poolManagerClient.get_pool_owner(),
    poolManagerClient.get_pool_owner_treasury(),
    poolManagerClient.is_pool_operator({
      addr: Accounts.poolOwner.publicKey()
    })
  ]);

  console.log('poolOwner', poolOwner);
  console.log('poolOwnerTreasury', poolOwnerTreasury);
  console.log('isPoolOperator', isPoolOperator);
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

export const enablePool = async (network: Network) => {
  // const poolManagerClient = getPoolManagerClient(
  //   Accounts.poolOwner.publicKey(),
  //   getCustomWallet(Accounts.poolOwner.secret())
  // );
  // const tx = await poolManagerClient.enable_pool(
  //   {
  //     caller: Accounts.poolOwner.publicKey()
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );
  // const { result } = await tx.signAndSend();

  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  await sendTransaction(
    Accounts.poolOwner.secret(),
    network,
    contracts.poolManager,
    'enable_pool',
    [toScVal(Accounts.poolOwner.publicKey(), ScValType.address)]
  );
};
