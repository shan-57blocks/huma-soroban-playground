import { Client } from '@huma/pool';

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
    const { result } = await pool.get_underlying_token();
    console.log('result', result);
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
        toScVal(Accounts.poolOwner.publicKey(), ScValType.Address),
        toScVal(1_000_000_000_000_000, ScValType.U128),
        toScVal(100_000_000, ScValType.U128),
        toScVal('Monthly', ScValType.Enum),
        toScVal(5, ScValType.U32),
        toScVal(10, ScValType.U32),
        toScVal(true, ScValType.Bool)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

getUnderlyingToken();
// setPoolSettings();
