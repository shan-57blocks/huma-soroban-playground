import { hash, Keypair, Transaction } from '@stellar/stellar-sdk';

import { Network, NetworkMetadatas, PoolMetadata } from './network';

export type XDR_BASE64 = string;

export interface Wallet {
  isConnected: () => Promise<boolean>;
  isAllowed: () => Promise<boolean>;
  getUserInfo: () => Promise<{
    publicKey?: string;
  }>;
  signTransaction: (
    tx: XDR_BASE64,
    opts?: {
      network?: string;
      networkPassphrase?: string;
      accountToSign?: string;
    }
  ) => Promise<XDR_BASE64>;
  signAuthEntry: (
    entryXdr: XDR_BASE64,
    opts?: {
      accountToSign?: string;
    }
  ) => Promise<XDR_BASE64>;
}

export const getCustomWallet = (secretKey: string) => {
  const sourceKeypair = Keypair.fromSecret(secretKey);

  const customWallet: Wallet = {
    isConnected: async () => await true,
    isAllowed: async () => await true,
    getUserInfo: async () =>
      await {
        publicKey: sourceKeypair.publicKey()
      },
    signTransaction: async (tx: string, opts) => {
      const txFromXDR = new Transaction(tx, opts.networkPassphrase);
      txFromXDR.sign(sourceKeypair);
      return txFromXDR.toXDR();
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signAuthEntry: async (entryXdr, opts) => {
      return (await sourceKeypair.sign(
        hash(Buffer.from(entryXdr, 'base64'))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as any;
    }
  };

  return customWallet;
};

export const getUnixTimestamp = (): number => {
  return Math.floor(new Date().getTime() / 1000);
};

export const findPoolMetadata = (
  network: Network,
  poolName: string
): PoolMetadata => {
  const selectedNetworkMetadata = NetworkMetadatas.find(
    (metadata) => metadata.network === network
  );
  return selectedNetworkMetadata.pools.find((pool) => pool.name === poolName);
};
