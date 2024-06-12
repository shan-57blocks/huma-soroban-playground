import { Client as CreditManagerClient } from '@huma-finance/soroban-credit-manager';
import { Client as CreditStorageClient } from '@huma-finance/soroban-credit-storage';
import { Client as PoolClient } from '@huma-finance/soroban-pool';
import { Client as PoolCreditClient } from '@huma-finance/soroban-pool-credit';
import { Client as PoolManagerClient } from '@huma-finance/soroban-pool-manager';
import { Client as PoolStorageClient } from '@huma-finance/soroban-pool-storage';
import { Client as UnderlyingTokenClient } from '@huma-finance/soroban-sep41';
import { Client as TrancheVaultClient } from '@huma-finance/soroban-tranche-vault';

import { findPoolMetadata, Wallet } from './common';
import { Network, NetworkPassphrase, POOL_NAME, PublicRpcUrl } from './network';

const getCommonProps = (
  network: Network,
  sender: string,
  customWallet?: Wallet
) => {
  return {
    publicKey: sender,
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    allowHttp: network === Network.localnet,
    ...(customWallet ?? {})
  };
};

export const getPoolClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new PoolClient({
    contractId: contracts.pool,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getPoolStorageClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new PoolStorageClient({
    contractId: contracts.poolStorage,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getPoolManagerClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new PoolManagerClient({
    contractId: contracts.poolManager,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getPoolCreditClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new PoolCreditClient({
    contractId: contracts.poolCredit,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getCreditStorageClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new CreditStorageClient({
    contractId: contracts.creditStorage,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getCreditManagerClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new CreditManagerClient({
    contractId: contracts.creditManager,
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getTrancheVaultClient = (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  tranche: 'senior' | 'junior',
  customWallet?: Wallet
) => {
  const { contracts } = findPoolMetadata(network, poolName);

  return new TrancheVaultClient({
    contractId: contracts[`${tranche}Tranche`],
    ...getCommonProps(network, sender, customWallet)
  });
};

export const getUnderlyingTokenClient = async (
  network: Network,
  poolName: POOL_NAME,
  sender: string,
  customWallet?: Wallet
) => {
  const poolStorageClient = getPoolStorageClient(network, poolName, sender);
  const { result: underlyingToken } =
    await poolStorageClient.get_underlying_token();

  return new UnderlyingTokenClient({
    contractId: underlyingToken,
    ...getCommonProps(network, sender, customWallet)
  });
};
