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
            'CCXBJLHC26VJWNAH2BL6DKBJXIKGQACL2O7H5ZKVX52G47NDOZET6ABG',
          pool: 'CDBRPZOAA4LFK72RHQ56CZNL2CUCN22CF4QUR56HLHPJSLUBH3YXCRXD',
          poolManager:
            'CAXVUZNSZ3QLU3AJELVAPWI2WPBPW62IISJRVQEQER4VVGJ2A7BDP4WM',
          poolCredit:
            'CA2BRONZXJZ5KRDQXYEPCL3BOIW7DCJFFNZ35MWMXSA3YRXUETZJ2R6D',
          juniorTranche:
            'CA47RS4Q4UPWJ3UVDZUKIKZKBR5C3W3ZHBHM62ZVRKZOF3T37HZJQD47',
          seniorTranche:
            'CAYILV6OETDMA4CRXWE2644XYJTSI7ZBNHXD6UWPAKZUXEATBSRA4VQZ'
        }
      }
    ]
  }
];
