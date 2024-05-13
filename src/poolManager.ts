import { Client as PoolManagerClient } from '@huma/poolManager';
import { Address } from '@stellar/stellar-sdk';

import {
  Accounts,
  ScValType,
  findPoolMetadata,
  getCustomWallet,
  toScVal
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const getPoolManagerInfo = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManagerClient = new PoolManagerClient({
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

export const enablePool = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolManagerClient = new PoolManagerClient({
    contractId: contracts.poolManager,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...getCustomWallet(Accounts.poolOwner.secret())
  });

  try {
    const tx = await poolManagerClient.enable_pool(
      {
        caller: Accounts.poolOwner.publicKey()
      },
      {
        timeoutInSeconds: 30
      }
    );
    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

export const getPoolOwnerMinLiquidityReq = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.poolManager,
      'get_pool_owner_min_liquidity_req',
      [toScVal(0, ScValType.u32)]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
