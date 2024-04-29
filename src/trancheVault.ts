import 'dotenv/config';

import { Client } from '@huma/trancheVault';
import { Keypair } from '@stellar/stellar-sdk';

import { findPoolMetadata, getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';

export const approveLender = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const poolOwner = Keypair.fromSecret(process.env.POOL_OWNER_SECRET_KEY);
  const lender = Keypair.fromSecret(process.env.LENDER_SECRET_KEY);
  const { contracts } = findPoolMetadata(network, poolName);

  const juniorTranche = new Client({
    contractId: contracts.juniorTranche,
    publicKey: poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...getCustomWallet(poolOwner.secret())
  });
  try {
    const tx = await juniorTranche.add_approved_lender({
      caller: poolOwner.publicKey(),
      lender: lender.publicKey(),
      reinvest_yield: true
    });
    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

approveLender();
