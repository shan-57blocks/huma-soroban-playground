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
  borrowers: string[];
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
            'CD35X6V3O5BVFWYGETHIHRWPJIWYIA3MYHHULBUJLMD4INX6Y34DW3EG',
          poolStorage:
            'CARX3M7LZM4QPPR65OGGY36GKEVD2LNV6I7IMB5EHE77XUAQXZHTKX6S',
          pool: 'CBB6RMWO2YBVSV66ZTBXZWEWKEFTFDP4K5YPV6KEMVZN26DNDXQI3JEO',
          poolManager:
            'CB6OOMIMGLDYYPI7QEJFKMNZEBMAZG5IF2SK7VTL5B4KE2KJVYKIIZOS',
          poolCredit:
            'CBB2X44GZCH2NMW7HQ53PAURLKQT2DOZVIQ3PWYY3YGQIOOUNAV5QACI',
          creditManager:
            'CBN6JIEPA4QQKANLMEUICLK24NBEWIG7TPIRGEXDT32WHYLBNHQU67CR',
          creditStorage:
            'CBXVWUFZU65MJZWFDMZSRSA6LPRVAUSOYCMVC3YJJXX32TH35MXUZJTN',
          juniorTranche:
            'CBWSIQMVG5VVUBTRFGAAXNZQ4AMRVYK2VN3346EP3JYPDZXT6VEOQEK2',
          seniorTranche:
            'CBSPGT3IW3PS2CIKVHZKPNA2KZP6EAXFZ3AH4LQ6HN252GGJKBNSIUAW'
        },
        borrowers: ['GCEXEXXG3RIQ67GXHA4I6CKQWDYGSAZYJNS4VU66O75F5KFV45GACQS6']
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
        },
        borrowers: []
      }
    ]
  }
];
