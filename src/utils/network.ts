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
            'CB4PQYTVJY7OVYIXXSOYZI4OKNJDGSE7ZNWUP4KFZXL7CST4ZM2MAW2G',
          pool: 'CDK4RTARC3CAIPNPRVN7CJEJEVNUYJSCCIOXIXELFITDOGFZQPD664BT',
          poolManager:
            'CD7GFYAD7O3UZQP5XWOHKZFQS36WWHPHPCOHYQ2UGUP66VJD4GYFTIFK',
          poolCredit:
            'CAHEQVMXNYRHY4AHEEHJPJT3OKONSKOWWFQWNRFTBVAZGYYZVLZPI5JH',
          juniorTranche:
            'CCQHMUOEYC4XNFCSOTTL2R25LTSV5E35YMNFIUUBUMLHY6G3D3UBLTWB',
          seniorTranche:
            'CDJ3G2XGBJLFBIY4E66C324VL2EYCHPXOFMKSRGX3EBHDMIIRJTGG5I2'
        }
      }
    ]
  }
];
