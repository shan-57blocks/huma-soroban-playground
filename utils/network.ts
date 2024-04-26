export enum Network {
  Testnet = 'testnet',
  Futurenet = 'futurenet',
  Mainnet = 'mainnet'
}

export enum NetworkPassphrase {
  Mainnet = 'Public Global Stellar Network ; September 2015',
  Futurenet = 'Test SDF Future Network ; October 2022',
  Testnet = 'Test SDF Network ; September 2015'
}

export enum PublicRpcUrl {
  Mainnet = 'https://horizon.stellar.org',
  Testnet = 'https://soroban-testnet.stellar.org',
  Futurenet = 'https://rpc-futurenet.stellar.org'
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
    network: Network.Testnet,
    networkPassphrase: NetworkPassphrase.Testnet,
    rpcUrl: PublicRpcUrl.Testnet,
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
