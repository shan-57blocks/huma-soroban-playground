import { Accounts } from './common';

export enum Network {
  testnet = 'testnet',
  mainnet = 'mainnet',
  futurenet = 'futurenet',
  localnet = 'localnet',
  humanet = 'humanet'
}

export enum NetworkPassphrase {
  mainnet = 'Public Global Stellar Network ; September 2015',
  testnet = 'Test SDF Network ; September 2015',
  futurenet = 'Test SDF Future Network ; October 2022',
  localnet = 'Standalone Network ; February 2017',
  humanet = 'Standalone Network ; February 2017'
}

export enum PublicRpcUrl {
  mainnet = 'https://horizon.stellar.org',
  testnet = 'https://soroban-testnet.stellar.org',
  futurenet = 'https://rpc-futurenet.stellar.org',
  localnet = 'http://localhost:8000/soroban/rpc',
  humanet = 'https://dev.stellar.huma.finance/soroban/rpc'
}

export enum POOL_NAME {
  Arf = 'Arf'
}

export enum POOL_TYPE {
  Creditline = 'Creditline'
}

export type PoolMetadata = {
  poolName: POOL_NAME;
  poolType: POOL_TYPE;
  contracts: {
    humaConfig: string;
    poolStorage: string;
    pool: string;
    poolManager: string;
    poolCredit: string;
    creditManager: string;
    creditStorage: string;
    seniorTranche: string;
    juniorTranche: string;
  };
  ledgers?: {
    humaConfig?: any[];
    poolStorage?: any[];
    pool?: any[];
    poolManager?: any[];
    poolCredit?: any[];
    creditManager?: any[];
    creditStorage?: any[];
    seniorTranche?: any[];
    juniorTranche?: any[];
  };
};

export type NetworkMetadata = {
  network: Network;
  networkPassphrase: NetworkPassphrase;
  rpcUrl: PublicRpcUrl;
  pools: PoolMetadata[];
};

export const NetworkMetadatas: NetworkMetadata[] = [
  {
    network: Network.humanet,
    networkPassphrase: NetworkPassphrase.humanet,
    rpcUrl: PublicRpcUrl.humanet,
    pools: [
      {
        poolName: POOL_NAME.Arf,
        poolType: POOL_TYPE.Creditline,
        contracts: {
          humaConfig:
            'CCVOWPMIRXC77EGSFOSKZQI34737UFLKYOMSV72RN2IPFNDEYMPN6QCR',
          poolStorage:
            'CBWVXH4CYWQFDAI26FQFSEMDPJUMNZ3RVIJWJXVFK4N3CB563Q6HMF7S',
          pool: 'CA7YDLH3MN23PBQIXFXO6DYKWTCBIVS7WC2N4RQXOKO5KM27CM2BTJGT',
          poolManager:
            'CARLNZ3NYWYOV2T6QRMZKNNDXTPU4O3KJ4MGSM3ZFKITZOEWD7A3Q7BH',
          poolCredit:
            'CAH7FTMJW3FZJPCWO6QPQJFKNM647JJYXZ6U4ZUGMO5V4UVT57XYE6JD',
          creditManager:
            'CBOUPUZNWER345C3AGDWP43EO63RGZ4ZRWDKSKL43MVDGRES5EAUHQSD',
          creditStorage:
            'CA2FYGZO5IJGMW354LI4H6HMMLQZIDUYHHFE6J4BCNKK2WQAQ7H4ZKNJ',
          juniorTranche:
            'CDX6U4FJDOFL6NLTUCFMJWIOUZQDVSNRNNYKCEEKUWQQ2MGZ4PAKP2JQ',
          seniorTranche:
            'CAWF6KJIWYCI2WY5OL47C6DAEHP7P7GPQ42WHW6PSUNHMFHYJ6S7MOKF'
        }
      }
    ]
  },
  {
    network: Network.testnet,
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    pools: [
      {
        poolName: POOL_NAME.Arf,
        poolType: POOL_TYPE.Creditline,
        contracts: {
          humaConfig:
            'CDLGSXVG53KX2PCZDQCCDRJZSOXY65NHSII77UMJYYLTPI5RAN3HBZXY',
          poolStorage:
            'CDAB3OLEOT2YF53FELUAK4ILLCHMGU5P55LALVEPLRCZAS5722UHXN5G',
          pool: 'CC4YZOXDN4Q2SROYIYSMCUBYK6LDF6UQXZNRTV2E53NSTLBO7AW5M2DI',
          poolManager:
            'CDHL2WHRDXRFBGVQXBOVGZV65S6GIB3B7RVZVPFVFSDHTG5WXUDNIB2Q',
          poolCredit:
            'CDEQGVT66H7DF2E7S2C66S4ZQWMLSCQ4LJP4P35XQRIDPM2UR54Q6MV6',
          creditManager:
            'CDBDXAGBOSPOLMOFK5EP25WPDPLH4PJJ7EQARXB3ZRNLMHP2BNMZ63PQ',
          creditStorage:
            'CDAI2N5CP25QVYT4BTAQRTD3WJU2EJFX7KOYCJBBM6NA33NHO3JXVEUA',
          juniorTranche:
            'CAVILKLJ752I7OXXCL3HXHMYP4ELACFQ55GOSLBLI33GGENNSUP3LICF',
          seniorTranche:
            'CBEO5JQ3FQJZY32D6VU4URASZDPBKSXBNAWSTI57MJCJWTHXRWRELMNK'
        }
      }
    ]
  }
];
