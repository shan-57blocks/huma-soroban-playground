import { Client } from '@huma/poolManager';
import { Address } from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata, ScValType, toScVal } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const getPoolManagerInfo = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManager = new Client({
    contractId: contracts.poolManager,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });

  const [
    { result: poolOwner },
    { result: poolOwnerTreasury },
    { result: isPoolOperator }
  ] = await Promise.all([
    poolManager.get_pool_owner(),
    poolManager.get_pool_owner_treasury(),
    poolManager.is_pool_operator({
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

export const enablePool = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.poolManager,
      'enable_pool',
      [toScVal(Accounts.poolOwner.publicKey(), ScValType.address)]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
