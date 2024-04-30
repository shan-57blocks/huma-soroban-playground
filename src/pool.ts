import { Client } from '@huma/pool';
import { scValToNative } from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata, ScValType, toScVal } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const getUnderlyingToken = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const pool = new Client({
    contractId: contracts.pool,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result: underlyingTokenAddress } =
      await pool.get_underlying_token();
    const symbol = await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      underlyingTokenAddress,
      'symbol'
    );
    const decimals = await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      underlyingTokenAddress,
      'decimals'
    );
    const underlyingToken = {
      address: underlyingTokenAddress,
      symbol: scValToNative(symbol),
      decimals: scValToNative(decimals)
    };
    console.log(underlyingToken);
  } catch (e) {
    console.error('Error', e);
  }
};

export const setPoolSettings = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  try {
    await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.pool,
      'set_pool_settings',
      [
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
        toScVal(1_000_000_000_000_000, ScValType.u128),
        toScVal(100_000_000, ScValType.u128),
        toScVal('Monthly', ScValType.enum),
        toScVal(5, ScValType.u32),
        toScVal(10, ScValType.u32),
        toScVal(true, ScValType.bool)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

getUnderlyingToken();
// setPoolSettings();
