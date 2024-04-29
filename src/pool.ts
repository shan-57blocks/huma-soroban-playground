import { Client } from '@huma/pool';
import { Address, nativeToScVal, xdr } from '@stellar/stellar-sdk';

import { Accounts, findPoolMetadata } from './utils/common';
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
        Address.fromString(Accounts.poolOwner.publicKey()).toScVal(),
        nativeToScVal(1_000_000_000_000_000, { type: 'u128' }),
        nativeToScVal(100_000_000, { type: 'u128' }),
        xdr.ScVal.scvVec([xdr.ScVal.scvSymbol('Monthly')]),
        nativeToScVal(5, { type: 'u32' }),
        nativeToScVal(10, { type: 'u32' }),
        xdr.ScVal.scvBool(true)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

getUnderlyingToken();
// setPoolSettings();
