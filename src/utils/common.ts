/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';

import {
  Address,
  Asset,
  hash,
  Keypair,
  nativeToScVal,
  scValToNative,
  Transaction,
  xdr
} from '@stellar/stellar-sdk';
import { spawn } from 'child_process';
import process from 'process';

import { Network, NetworkMetadatas, PoolMetadata } from './network';

export type XDR_BASE64 = string;

export enum ScValType {
  address = 'address',
  u128 = 'u128',
  u64 = 'u64',
  u32 = 'u32',
  bool = 'bool',
  enum = 'enum'
}

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

export const Accounts = {
  poolOwner: Keypair.fromSecret(process.env.POOL_OWNER_SECRET_KEY),
  deployer: Keypair.fromSecret(process.env.DEPLOYER_SECRET_KEY),
  lender: Keypair.fromSecret(process.env.LENDER_SECRET_KEY),
  borrower: Keypair.fromSecret(process.env.BORROWER_SECRET_KEY)
};

export const toScVal = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  type: ScValType
) => {
  switch (type) {
    case ScValType.address:
      return Address.fromString(value).toScVal();

    case ScValType.u128:
      return nativeToScVal(value, { type: ScValType.u128 });

    case ScValType.u64:
      return nativeToScVal(value, { type: ScValType.u64 });

    case ScValType.u32:
      return nativeToScVal(value, { type: ScValType.u32 });

    case ScValType.bool:
      return xdr.ScVal.scvBool(value);

    case ScValType.enum:
      return xdr.ScVal.scvVec([xdr.ScVal.scvSymbol(value)]);

    default:
      break;
  }
};

export const cmd = async (command: string) => {
  const internalCmd = (...command: string[]) => {
    const p = spawn(command[0], command.slice(1));
    return new Promise((resolveFunc) => {
      p.stdout.on('data', (x: any) => {
        resolveFunc(x.toString().replace(/\W/g, ''));
      });
      p.stderr.on('data', (x: any) => {
        // process.stderr.write(x.toString());
      });
      p.on('exit', (code: any) => {
        resolveFunc(code);
      });
    });
  };

  return internalCmd('bash', '-c', command);
};

export const decodeScValString = (buffer: number[]) => {
  const text = scValToNative(xdr.ScVal.scvString(Buffer.from(buffer)));
  console.log('text', text);
};
