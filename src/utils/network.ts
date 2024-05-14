export enum Network {
  mainnet = 'mainnet',
  testnet = 'testnet',
  futurenet = 'futurenet'
}

export enum NetworkPassphrase {
  mainnet = 'Public Global Stellar Network ; September 2015',
  futurenet = 'Test SDF Future Network ; October 2022',
  testnet = 'Test SDF Network ; September 2015'
}

export enum PublicRpcUrl {
  mainnet = 'https://horizon.stellar.org',
  testnet = 'https://soroban-testnet.stellar.org',
  futurenet = 'https://rpc-futurenet.stellar.org'
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
            'CBJDD3SFIBL6L7SYXLW6WKQ4D4VU5SB5ZYZEUDETNWZRM5EXXSHRJUSL',
          pool: 'CBIUBEQP5D74QDXMDPJVQRW3ML4ZYYN6LMCI2XYNGJDIYPZZMNKXRCMR',
          poolManager:
            'CBRMYMGFERNJLBQBUH5EB3TEO5TA2U6E3ZUPOZMWGMNCD6RGZKUC6PGZ',
          poolCredit:
            'CA66RRWQI3UE6DKJRDAQCCXIMNXTYUSJNFUWXMYKMOLKLTIL7Y6MDJA6',
          juniorTranche:
            'CDVKVUC2RVH3XE4YRHLESNNGCKKRW7NGLXME77FD6N3WAP3BPKYFYGIA',
          seniorTranche:
            'CB6VBLH6DYQX5MKSOTV2W3TFP2FJ4JNEFXVYVNKUNULF4ZBLLRQMD4DL'
        }
      }
    ]
  }
];
