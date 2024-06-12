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
};

export type NetworkMetadata = {
  network: Network;
  networkPassphrase: NetworkPassphrase;
  rpcUrl: PublicRpcUrl;
  pools: PoolMetadata[];
};

export const NetworkMetadatas: NetworkMetadata[] = [
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
            'CAHPEHOIZIIMMTFCZOYEXDKHXJZ2QDYLRD3SF2AZTXWAUV4OWKGHPDCL',
          poolStorage:
            'CDL3YWC2SMRK363QPS4AR5TGVFESE3FMIPOGHEQBMJJA3RTQQ2ALW73U',
          pool: 'CCUM2YAJM3EY2RTFMX5P6PDBT7ZZWPNNQLMW4CGIGQJKLTLT7J2SMAMV',
          poolManager:
            'CDPNNXOD6LVIXD2VYAH6CKQ6TPQYDITGJ4END7LFLR7OIZNHLCWLF347',
          poolCredit:
            'CCRLVVJOUF5MHMKJ36YWRCKPK7YUVDHA7ZNEL6EDSU2LUDHIOMN65S5G',
          creditManager:
            'CASGH7RO7Q4H3JOMACIFKIVZDIL7AFHYELXB5JQ6VWTMQ7IMO6GEBRQ5',
          creditStorage:
            'CAWXNUPJVXSPZ4WSWURNYYPECL3GDPLLP7LSSBMRXMDGWZ4ZXNIHMITS',
          juniorTranche:
            'CAX7J3ZANVPKCW4YSTWUBOUNO667MLH2FQGDURE4RPPI5BWPAO6WCSKZ',
          seniorTranche:
            'CAX34UNMKDDDO7IFQO7VZ43UYYWLUILLMU52HDGBBDQFYGQQUCYASOWH'
        }
      }
    ]
  },
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
  }
];
