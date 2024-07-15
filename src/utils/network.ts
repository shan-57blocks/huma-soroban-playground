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
  lenders: string[];
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
        borrowers: [
          'GCEXEXXG3RIQ67GXHA4I6CKQWDYGSAZYJNS4VU66O75F5KFV45GACQS6',
          'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7' //arf
        ],
        lenders: [
          'GA2BM4VSNOWQLBYYIHJRXZHTBLQ77AWWWGI4OWMCY5KD6I3VP4HU4SQG', // pool owner
          'GACQN6PWCCY6IERUPOC5AO5BTCASDFI6LPODWVJJWBTKHKORTOGF3X3P', // ea
          'GBQZL46F4UXAE6HXCV53NHKID3JVJNSHGHEVZL5WG56OI5FTA6T6IPZD'
        ]
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
            'CDEH36NMZK6AV5I675A2BSRIWLJGBVXWN5HHABKJKHNIGKSKJQVXPXFB',
          poolStorage:
            'CBHY4NM3DVEBX3QTL3X5XEOAKHDMP44HDP7SBDTCOAMFU7LFIBMFEV4N',
          pool: 'CAI6UQAXZ6ICE5QQ4WFEEDQLZORGMYBCL2RB2NVY6AGMH4XT6PCH7IPX',
          poolManager:
            'CCTCNYWWKPVFNPJDQUMJM6GFBU6IJSZH6CHPM5COJTBMWO64A4XVCXNV',
          poolCredit:
            'CCYWDOW34SPB3FCR6A633B5GS5DPRRQKTTCT4DU7YYFDRT7XBOA2HYYY',
          creditManager:
            'CDHYIC3ISV3F3RL7FROC3SI2GW65ZOJHMA2AMZJYLIRLWSDELFF3CR23',
          creditStorage:
            'CBZHE4LD4FYGELCFDVRNBLNO4743X4UJDIDC7CGYS3MLJ3CIHC4SGLHC',
          juniorTranche:
            'CAJZ4V2N5TOJ6GVOJOKTJSP3QYDNVC6O6TDO2V64GULQGZNRRFM5AS7V',
          seniorTranche:
            'CBQV4USFV4MBZTKK6W6SM576GVBZGZZHEHT7Y2OVIKNYG45L57LDL6SA'
        },
        borrowers: [],
        lenders: []
      }
    ]
  }
];
