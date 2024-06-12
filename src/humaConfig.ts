import { Client } from '@huma/humaConfig';
import { Accounts, ScValType, findPoolMetadata, toScVal } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

export const getProtocolInfo = async () => {
  const protocolPaused = await isProtocolPaused();
  console.log('protocolPaused', protocolPaused);
};

export const isProtocolPaused = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const humaConfig = new Client({
    contractId: contracts.humaConfig,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result } = await humaConfig.is_protocol_paused();
    return result;
  } catch (e) {
    console.error('Error', e);
  }
};

export const unpauseProtocol = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts.deployer.secret(),
      network,
      contracts.humaConfig,
      'unpause_protocol'
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const setLiquidityAsset = async (network: Network, poolName: string) => {
  const { contracts } = findPoolMetadata(network, poolName);
  try {
    await sendTransaction(
      Accounts.deployer.secret(),
      network,
      contracts.humaConfig,
      'set_liquidity_asset',
      [
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
        toScVal(true, ScValType.bool)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};
