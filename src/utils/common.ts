/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';

import {
  Address,
  Asset,
  hash,
  Keypair,
  Memo,
  MemoType,
  nativeToScVal,
  Operation,
  scValToNative,
  SorobanRpc,
  Transaction,
  xdr
} from '@stellar/stellar-sdk';
import { spawn } from 'child_process';
import process from 'process';
// @ts-ignore
import StellarHDWallet from 'stellar-hd-wallet';

import { Network, NetworkMetadatas, POOL_NAME, PoolMetadata } from './network';

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
  poolName: POOL_NAME
): PoolMetadata => {
  const selectedNetworkMetadata = NetworkMetadatas.find(
    (metadata) => metadata.network === network
  );
  return selectedNetworkMetadata.pools.find(
    (pool) => pool.poolName === poolName
  );
};

export const Accounts: Record<
  string,
  {
    poolOwner?: Keypair;
    poolOperator?: Keypair;
    lender?: Keypair;
    humaOwner?: Keypair;
    borrower?: Keypair;
    ea?: Keypair;
  }
> = {
  [Network.humanet]: {
    poolOwner: Keypair.fromSecret(process.env.HUMANET_POOL_OWNER_SECRET_KEY),
    poolOperator: Keypair.fromSecret(
      process.env.HUMANET_POOL_OPERATOR_SECRET_KEY
    ),
    lender: Keypair.fromSecret(process.env.HUMANET_LENDER_SECRET_KEY),
    humaOwner: Keypair.fromSecret(process.env.HUMANET_HUMA_OWNER_SECRET_KEY),
    borrower: Keypair.fromSecret(process.env.HUMANET_BORROWER_SECRET_KEY),
    ea: Keypair.fromSecret(process.env.HUMANET_EA_SECRET_KEY)
  },
  [Network.testnet]: {
    borrower: Keypair.fromSecret(process.env.TESTNET_BORROWER_SECRET_KEY)
  }
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

export const genKeypairFromMnemonic = (mnemonic: string) => {
  const wallet = StellarHDWallet.fromMnemonic(mnemonic);
  return Keypair.fromSecret(wallet.getSecret(0));
};

export const genContracts = () => {
  const contractsStr = `huma_config_contract_id=CD35X6V3O5BVFWYGETHIHRWPJIWYIA3MYHHULBUJLMD4INX6Y34DW3EG;
pool_storage_contract_id=CARX3M7LZM4QPPR65OGGY36GKEVD2LNV6I7IMB5EHE77XUAQXZHTKX6S;
pool_contract_id=CBB6RMWO2YBVSV66ZTBXZWEWKEFTFDP4K5YPV6KEMVZN26DNDXQI3JEO;
pool_manager_contract_id=CB6OOMIMGLDYYPI7QEJFKMNZEBMAZG5IF2SK7VTL5B4KE2KJVYKIIZOS;
credit_contract_id=CBB2X44GZCH2NMW7HQ53PAURLKQT2DOZVIQ3PWYY3YGQIOOUNAV5QACI;
credit_manager_contract_id=CBN6JIEPA4QQKANLMEUICLK24NBEWIG7TPIRGEXDT32WHYLBNHQU67CR;
credit_storage_contract_id=CBXVWUFZU65MJZWFDMZSRSA6LPRVAUSOYCMVC3YJJXX32TH35MXUZJTN;
junior_tranche_contract_id=CBWSIQMVG5VVUBTRFGAAXNZQ4AMRVYK2VN3346EP3JYPDZXT6VEOQEK2;
senior_tranche_contract_id=CBSPGT3IW3PS2CIKVHZKPNA2KZP6EAXFZ3AH4LQ6HN252GGJKBNSIUAW`;

  const borrowerSecret =
    'SDWKOBOPHOSZUMIBQNBVEXHWAQXQEVGD2WNGGW534KDF3RVBC6NSF54Y';

  const nameMap = {
    huma_config_contract_id: 'humaConfig',
    pool_storage_contract_id: 'poolStorage',
    pool_contract_id: 'pool',
    pool_manager_contract_id: 'poolManager',
    credit_contract_id: 'poolCredit',
    credit_manager_contract_id: 'creditManager',
    credit_storage_contract_id: 'creditStorage',
    junior_tranche_contract_id: 'juniorTranche',
    senior_tranche_contract_id: 'seniorTranche'
  };

  const contracts = contractsStr
    .replace(/ /g, '')
    .replace(/\n/g, '')
    .split(';');

  // @ts-ignore
  const result = { contracts: {}, borrowers: [] };
  contracts.forEach((contract) => {
    if (contract === '') return;
    const [key, value] = contract.split('=');
    // @ts-ignore
    result.contracts[nameMap[key]] = value;
  });

  result.borrowers = [Keypair.fromSecret(borrowerSecret).publicKey()];

  console.log(result);
};
