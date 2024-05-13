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
            'CARGEUA52UA7H2KIQS7W55TOCM6IMNYMM3PVDE2M5PS5TZZRDDC4533I',
          pool: 'CAFUPHXFRTFGVVNR4MQ3EPKP6M6BEMM4CHNX5JBV2IENZYPR2PK2QX7G',
          poolManager:
            'CC5GICX2MXD6XUWOYSWW5BBT6O6TVMV6UFSGCDJVB3OU2MXBJJFIURM4',
          poolCredit:
            'CDDYS2PJWI5JGEBQVYUCFPVZJACF23DX3MQYTMGGWOZHB2VLPAZDODUZ',
          juniorTranche:
            'CCD47WW6GOK5T56LRUJU6XJDYRJB75C6QZ2FZT5UDSG2Y5BWQTMJLSEG',
          seniorTranche:
            'CBVUN5JC67IOCWFWMAMA2MOJPKNN2HS4UAAEBTTDCOXBXWUSLBIZDJHW'
        }
      }
    ]
  }
];
