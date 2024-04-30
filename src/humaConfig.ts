import { Client } from '@huma/humaConfig';
import { Accounts, findPoolMetadata } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction } from './utils/transaction';

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
    console.log(result);
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