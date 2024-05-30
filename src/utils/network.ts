export enum Network {
  testnet = 'testnet',
  mainnet = 'mainnet',
  futurenet = 'futurenet',
  localnet = 'localnet'
}

export enum NetworkPassphrase {
  mainnet = 'Public Global Stellar Network ; September 2015',
  testnet = 'Test SDF Network ; September 2015',
  futurenet = 'Test SDF Future Network ; October 2022',
  localnet = 'Standalone Network ; February 2017'
}

export enum PublicRpcUrl {
  mainnet = 'https://horizon.stellar.org',
  testnet = 'https://soroban-testnet.stellar.org',
  futurenet = 'https://rpc-futurenet.stellar.org',
  localnet = 'http://localhost:8000/soroban/rpc'
}

export type PoolMetadata = {
  name: string;
  contracts: {
    humaConfig: string;
    pool: string;
    poolManager: string;
    poolCredit: string;
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
        name: 'Arf',
        contracts: {
          humaConfig:
            'CBKFBQJ75W5IJLE3UKSU4M4B2VOW2RHBR5HNJYCMV5JDEIJ24BL5NG4W',
          pool: 'CDV7P3XW7ZK6VZIZXT3RHIZJTW2WMNJBOQ4VN2YPOOX6F6DEYVJGJ5EL',
          poolManager:
            'CCPV55EKDYBWQLO22YZSZ6I5DP4JNT2VF6VRPMM3WARR3YDCGKPFKYVI',
          poolCredit:
            'CBYB7OOBLH7XNHRPLKP2URHZ5CA3DS7QTOJDBMVWYNJE3MJK6W6G3Q6D',
          juniorTranche:
            'CAQ2UMCFVFH4ZD2F3EOOTKCX3DRUCQMKZJGAYQFDS6CJJFH5OAADTRUK',
          seniorTranche:
            'CAEZEGVK2FNDQSAA7KNMMPU6BS5YVW5DMWHMBPCS3EZYVMRCECWJSWAW'
        }
      }
    ]
  },
  {
    network: Network.futurenet,
    networkPassphrase: NetworkPassphrase.futurenet,
    rpcUrl: PublicRpcUrl.futurenet,
    pools: [
      {
        name: 'Arf',
        contracts: {
          humaConfig:
            'CD5RVTRWKCRXHT4Y42JUFM4XPVWAS7LVDRO4JVVVH7HU7MOYB2CPC5OI',
          pool: 'CAEIZ3TOOKLYJ6FATQST2E66HPTOGFXW3OBLFWN2WGMDDWI233R37WLS',
          poolManager:
            'CDYKJTKZJNRQTTXELRANLXDVUUCXHXTQZ7BQMLLDOZ6QUGF5RYR2RTHK',
          poolCredit:
            'CBKBFMZ5SNVCJT2I2UERB46XDJZM2VIPRWHHEJKKJKDBN2M7Z6352U4N',
          juniorTranche:
            'CAR4WK7GVABJMC3YPEWDI7GOUMRJ2GUOW6E6V2W6FDAH5SIUUY7MCMQX',
          seniorTranche:
            'CD2OOEVEEBCVZUHCTLN6UJHAYCBB6M67RS6QAN2PUY4EIZ4RQUTXGJVH'
        }
      }
    ]
  }
];
