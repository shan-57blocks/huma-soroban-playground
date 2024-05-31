/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from '@huma/pool';
import {
  getPoolInfo,
  getUnderlyingToken,
  setFeeStructure,
  setLpConfig,
  setPoolSettings,
  underlyingTokenBalanceOf,
  underlyingTokenTransfer
} from './pool';
import { enablePool, getPoolManagerInfo } from './poolManager';
import { Accounts, decodeScValString } from './utils/common';
import {
  addRedemptionRequest,
  approveLender,
  cancelRedemptionRequest,
  deposit,
  makeInitialDeposit
} from './trancheVault';
import {
  getProtocolInfo,
  isProtocolPaused,
  unpauseProtocol
} from './humaConfig';
import { approveToken, getAllowance } from './token';
import { Network, PublicRpcUrl } from './utils/network';
import { approveBorrower } from './poolCredit';
import { createChangeTrustTransaction } from './utils/transaction';
import { xdr, Address, Contract, SorobanRpc } from '@stellar/stellar-sdk';

import {
  POOL_NAME,
  StellarNetwork,
  StellarWallet,
  drawdown,
  makePayment
} from '@huma-shan/soroban-sdk';

(async () => {
  const wallet = new StellarWallet(
    'SB2EYCOYEITOLL5NTD5ADVHFLZWPMQCMAZ33R4FP5GS3KLG3TA63WKPO'
  );
  //100 USDC. Stellar USDC's decimal is 7
  // const borrowAmount = 10_0000000n;

  // const drawdownResult = await drawdown(
  //   POOL_NAME.Arf,
  //   StellarNetwork.localnet,
  //   wallet,
  //   borrowAmount
  // );
  // drawdownResult.sendTransactionResponse?.hash;
  // console.log(
  //   `Drawdown success. Tx hash: ${drawdownResult.sendTransactionResponse?.hash}`
  // );

  // const paymentAmount = 100_0000000n;
  // const makePaymentResult = await makePayment(
  //   POOL_NAME.Arf,
  //   StellarNetwork.localnet,
  //   wallet,
  //   paymentAmount,
  //   true
  // );
  // console.log(
  //   `Payment success. Tx hash: ${makePaymentResult.sendTransactionResponse?.hash}`
  // );

  // await getUnderlyingToken(Network.futurenet);
  // await setFeeStructure();
  // await drawdown();
  // await underlyingTokenTransfer(Network.futurenet);
  // await createChangeTrustTransaction(
  //   Network.futurenet,
  //   Accounts.lender.secret()
  // );
  // await underlyingTokenBalanceOf(
  //   Accounts.poolOwner.publicKey(),
  //   Network.futurenet
  // );
  // await unpauseProtocol();
  // await getPoolOwnerTreasury();
  // await getPoolManagerInfo();
  // await getProtocolInfo();
  // await setLpConfig(Network.futurenet);
  // await approveToken();
  // await getAllowance();
  // await getPoolOwnerMinLiquidityReq();
  // await enablePool(Network.futurenet);
  // await approveLender(Network.futurenet);
  // await setPoolSettings();
  // await makeInitialDeposit(Network.futurenet, 'seniorTranche');
  // await getPoolInfo(Network.futurenet);
  // await deposit(Network.futurenet, 'poolOwner', 'juniorTranche');
  // await addRedemptionRequest(Network.futurenet, 'poolOwner', 'juniorTranche');
  // await cancelRedemptionRequest(
  //   Network.futurenet,
  //   'poolOwner',
  //   'juniorTranche'
  // );
  // await approveBorrower(Network.futurenet);
  // decodeScValString();
  // const getLedgerKeySymbol = (contractId: string, symbolText: string) => {
  //   const ledgerKey = xdr.LedgerKey.contractData(
  //     new xdr.LedgerKeyContractData({
  //       contract: new Address(contractId).toScAddress(),
  //       key: xdr.ScVal.scvSymbol(symbolText),
  //       durability: xdr.ContractDataDurability.persistent()
  //     })
  //   );
  //   return ledgerKey.toXDR('base64');
  // };
  // const key = getLedgerKeySymbol(
  //   'CCVRLKWWSYYFAEOCMLH5BT5B3SWCJSO6SMB5S3LOZ5BMKE6D6PTCXJRL',
  //   'COUNTER'
  // );
  // const requestBody = {
  //   jsonrpc: '2.0',
  //   id: 8675309,
  //   method: 'getLedgerEntries',
  //   params: {
  //     keys: [key]
  //   }
  // };
  // const res = await fetch('https://soroban-testnet.stellar.org', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(requestBody)
  // });
  // const json = await res.json();
  // console.log(JSON.stringify(json));
  // const getLedgerKeySymbol = (contractId: string, symbolText: string) => {
  //   const ledgerKey = xdr.LedgerKey.contractData(
  //     new xdr.LedgerKeyContractData({
  //       contract: new Address(contractId).toScAddress(),
  //       key: xdr.ScVal.scvSymbol(symbolText),
  //       durability: xdr.ContractDataDurability.persistent()
  //     })
  //   );
  //   return ledgerKey;
  // };
  // const keys = getLedgerKeySymbol(
  //   'CCVRLKWWSYYFAEOCMLH5BT5B3SWCJSO6SMB5S3LOZ5BMKE6D6PTCXJRL',
  //   'COUNTER'
  // );
  // const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  // const entries = await server.getLedgerEntries(keys);
  // console.log(JSON.stringify(entries));

  const getLedgerKeySymbol = (contractId: string) => {
    const instance = new Contract(contractId).getFootprint();
    return instance;
  };
  const keys = getLedgerKeySymbol(
    'CAKPKH2G3ALGKW2E5BJFUJ6WR3RXJVGIXEAPVI5S6Q4HKSDCMKEYJSBR'
  );
  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const entries = await server.getLedgerEntries(keys);
  console.log(JSON.stringify(entries));
})();

const test = {
  latestLedger: 1868623,
  entries: [
    {
      lastModifiedLedgerSeq: 1735681,
      key: {
        _switch: { name: 'contractData', value: 6 },
        _arm: 'contractData',
        _value: {
          _attributes: {
            contract: {
              _switch: { name: 'scAddressTypeContract', value: 1 },
              _arm: 'contractId',
              _armType: { _length: 32 },
              _value: {
                type: 'Buffer',
                data: [
                  20, 245, 31, 70, 216, 22, 101, 91, 68, 232, 82, 90, 39, 214,
                  142, 227, 116, 212, 200, 185, 0, 250, 163, 178, 244, 56, 117,
                  72, 98, 98, 137, 132
                ]
              }
            },
            key: {
              _switch: { name: 'scvLedgerKeyContractInstance', value: 20 }
            },
            durability: { name: 'persistent', value: 1 }
          }
        }
      },
      val: {
        _switch: { name: 'contractData', value: 6 },
        _arm: 'contractData',
        _value: {
          _attributes: {
            ext: { _switch: 0 },
            contract: {
              _switch: { name: 'scAddressTypeContract', value: 1 },
              _arm: 'contractId',
              _armType: { _length: 32 },
              _value: {
                type: 'Buffer',
                data: [
                  20, 245, 31, 70, 216, 22, 101, 91, 68, 232, 82, 90, 39, 214,
                  142, 227, 116, 212, 200, 185, 0, 250, 163, 178, 244, 56, 117,
                  72, 98, 98, 137, 132
                ]
              }
            },
            key: {
              _switch: { name: 'scvLedgerKeyContractInstance', value: 20 }
            },
            durability: { name: 'persistent', value: 1 },
            val: {
              _switch: { name: 'scvContractInstance', value: 19 },
              _arm: 'instance',
              _value: {
                _attributes: {
                  executable: {
                    _switch: { name: 'contractExecutableWasm', value: 0 },
                    _arm: 'wasmHash',
                    _armType: { _length: 32 },
                    _value: {
                      type: 'Buffer',
                      data: [
                        52, 234, 18, 113, 181, 21, 240, 11, 238, 64, 218, 75,
                        107, 217, 209, 94, 239, 111, 185, 45, 98, 214, 104, 212,
                        215, 79, 108, 204, 28, 170, 62, 19
                      ]
                    }
                  },
                  storage: [
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  69, 118, 97, 108, 117, 97, 116, 105, 111, 110,
                                  65, 103, 101, 110, 116
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: { name: 'scAddressTypeAccount', value: 0 },
                            _arm: 'accountId',
                            _value: {
                              _switch: {
                                name: 'publicKeyTypeEd25519',
                                value: 0
                              },
                              _arm: 'ed25519',
                              _armType: { _length: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  108, 227, 189, 106, 238, 235, 85, 52, 149,
                                  248, 188, 239, 35, 13, 253, 246, 229, 158,
                                  227, 98, 252, 106, 228, 47, 32, 126, 201, 218,
                                  199, 120, 118, 223
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  70, 101, 101, 83, 116, 114, 117, 99, 116, 117,
                                  114, 101
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvMap', value: 17 },
                          _arm: 'map',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      102, 114, 111, 110, 116, 95, 108, 111, 97,
                                      100, 105, 110, 103, 95, 102, 101, 101, 95,
                                      98, 112, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 0
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      102, 114, 111, 110, 116, 95, 108, 111, 97,
                                      100, 105, 110, 103, 95, 102, 101, 101, 95,
                                      102, 108, 97, 116
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU128', value: 9 },
                                  _arm: 'u128',
                                  _value: {
                                    _attributes: {
                                      hi: { _value: '0' },
                                      lo: { _value: '0' }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      108, 97, 116, 101, 95, 102, 101, 101, 95,
                                      98, 112, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 1000
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      121, 105, 101, 108, 100, 95, 98, 112, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 1500
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  72, 117, 109, 97, 67, 111, 110, 102, 105, 103
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: {
                              name: 'scAddressTypeContract',
                              value: 1
                            },
                            _arm: 'contractId',
                            _armType: { _length: 32 },
                            _value: {
                              type: 'Buffer',
                              data: [
                                252, 79, 152, 177, 56, 97, 237, 127, 55, 87,
                                112, 214, 64, 161, 10, 202, 43, 132, 36, 167,
                                171, 139, 134, 80, 255, 197, 135, 98, 2, 237,
                                43, 179
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [72, 117, 109, 97, 79, 119, 110, 101, 114]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: { name: 'scAddressTypeAccount', value: 0 },
                            _arm: 'accountId',
                            _value: {
                              _switch: {
                                name: 'publicKeyTypeEd25519',
                                value: 0
                              },
                              _arm: 'ed25519',
                              _armType: { _length: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  108, 227, 189, 106, 238, 235, 85, 52, 149,
                                  248, 188, 239, 35, 13, 253, 246, 229, 158,
                                  227, 98, 252, 106, 228, 47, 32, 126, 201, 218,
                                  199, 120, 118, 223
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [76, 80, 67, 111, 110, 102, 105, 103]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvMap', value: 17 },
                          _arm: 'map',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      102, 105, 120, 101, 100, 95, 115, 101,
                                      110, 105, 111, 114, 95, 121, 105, 101,
                                      108, 100, 95, 98, 112, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 800
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      108, 105, 113, 117, 105, 100, 105, 116,
                                      121, 95, 99, 97, 112
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU128', value: 9 },
                                  _arm: 'u128',
                                  _value: {
                                    _attributes: {
                                      hi: { _value: '0' },
                                      lo: { _value: '100000000000' }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      109, 97, 120, 95, 115, 101, 110, 105, 111,
                                      114, 95, 106, 117, 110, 105, 111, 114, 95,
                                      114, 97, 116, 105, 111
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 4
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      116, 114, 97, 110, 99, 104, 101, 115, 95,
                                      114, 105, 115, 107, 95, 97, 100, 106, 117,
                                      115, 116, 109, 101, 110, 116, 95, 98, 112,
                                      115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 0
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      119, 105, 116, 104, 100, 114, 97, 119, 97,
                                      108, 95, 108, 111, 99, 107, 111, 117, 116,
                                      95, 112, 101, 114, 105, 111, 100, 95, 100,
                                      97, 121, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 0
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 67, 114, 101, 100, 105, 116
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: {
                              name: 'scAddressTypeContract',
                              value: 1
                            },
                            _arm: 'contractId',
                            _armType: { _length: 32 },
                            _value: {
                              type: 'Buffer',
                              data: [
                                81, 245, 152, 150, 18, 74, 237, 1, 241, 33, 131,
                                25, 210, 225, 234, 89, 147, 165, 213, 31, 252,
                                194, 72, 129, 253, 125, 110, 33, 60, 202, 224,
                                148
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 77, 97, 110, 97, 103, 101,
                                  114
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: {
                              name: 'scAddressTypeContract',
                              value: 1
                            },
                            _arm: 'contractId',
                            _armType: { _length: 32 },
                            _value: {
                              type: 'Buffer',
                              data: [
                                191, 51, 12, 113, 144, 53, 31, 151, 209, 69,
                                182, 247, 19, 50, 62, 181, 19, 124, 120, 110,
                                111, 227, 99, 88, 52, 52, 237, 236, 157, 14,
                                109, 38
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 79, 119, 110, 101, 114
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: { name: 'scAddressTypeAccount', value: 0 },
                            _arm: 'accountId',
                            _value: {
                              _switch: {
                                name: 'publicKeyTypeEd25519',
                                value: 0
                              },
                              _arm: 'ed25519',
                              _armType: { _length: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  108, 227, 189, 106, 238, 235, 85, 52, 149,
                                  248, 188, 239, 35, 13, 253, 246, 229, 158,
                                  227, 98, 252, 106, 228, 47, 32, 126, 201, 218,
                                  199, 120, 118, 223
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 79, 119, 110, 101, 114, 84,
                                  114, 101, 97, 115, 117, 114, 121
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: { name: 'scAddressTypeAccount', value: 0 },
                            _arm: 'accountId',
                            _value: {
                              _switch: {
                                name: 'publicKeyTypeEd25519',
                                value: 0
                              },
                              _arm: 'ed25519',
                              _armType: { _length: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  108, 227, 189, 106, 238, 235, 85, 52, 149,
                                  248, 188, 239, 35, 13, 253, 246, 229, 158,
                                  227, 98, 252, 106, 228, 47, 32, 126, 201, 218,
                                  199, 120, 118, 223
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 83, 101, 116, 116, 105,
                                  110, 103, 115
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvMap', value: 17 },
                          _arm: 'map',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      100, 101, 102, 97, 117, 108, 116, 95, 103,
                                      114, 97, 99, 101, 95, 112, 101, 114, 105,
                                      111, 100, 95, 100, 97, 121, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 0
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      108, 97, 116, 101, 95, 112, 97, 121, 109,
                                      101, 110, 116, 95, 103, 114, 97, 99, 101,
                                      95, 112, 101, 114, 105, 111, 100, 95, 100,
                                      97, 121, 115
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU32', value: 3 },
                                  _arm: 'u32',
                                  _value: 0
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      109, 97, 120, 95, 99, 114, 101, 100, 105,
                                      116, 95, 108, 105, 110, 101
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU128', value: 9 },
                                  _arm: 'u128',
                                  _value: {
                                    _attributes: {
                                      hi: { _value: '0' },
                                      lo: { _value: '1000000000000' }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      109, 105, 110, 95, 100, 101, 112, 111,
                                      115, 105, 116, 95, 97, 109, 111, 117, 110,
                                      116
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvU128', value: 9 },
                                  _arm: 'u128',
                                  _value: {
                                    _attributes: {
                                      hi: { _value: '0' },
                                      lo: { _value: '100000000' }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      112, 97, 121, 95, 112, 101, 114, 105, 111,
                                      100, 95, 100, 117, 114, 97, 116, 105, 111,
                                      110
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvVec', value: 16 },
                                  _arm: 'vec',
                                  _armType: {
                                    _childType: { _maxLength: 2147483647 }
                                  },
                                  _value: [
                                    {
                                      _switch: { name: 'scvSymbol', value: 15 },
                                      _arm: 'sym',
                                      _armType: { _maxLength: 32 },
                                      _value: {
                                        type: 'Buffer',
                                        data: [77, 111, 110, 116, 104, 108, 121]
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [
                                      112, 114, 105, 110, 99, 105, 112, 97, 108,
                                      95, 111, 110, 108, 121, 95, 112, 97, 121,
                                      109, 101, 110, 116, 95, 97, 108, 108, 111,
                                      119, 101, 100
                                    ]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvBool', value: 0 },
                                  _arm: 'b',
                                  _value: true
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 111, 111, 108, 83, 116, 97, 116, 117, 115
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: { type: 'Buffer', data: [79, 102, 102] }
                            }
                          ]
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  80, 114, 111, 116, 111, 99, 111, 108, 79, 110
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvBool', value: 0 },
                          _arm: 'b',
                          _value: true
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [83, 101, 110, 116, 105, 110, 101, 108]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: { name: 'scAddressTypeAccount', value: 0 },
                            _arm: 'accountId',
                            _value: {
                              _switch: {
                                name: 'publicKeyTypeEd25519',
                                value: 0
                              },
                              _arm: 'ed25519',
                              _armType: { _length: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  108, 227, 189, 106, 238, 235, 85, 52, 149,
                                  248, 188, 239, 35, 13, 253, 246, 229, 158,
                                  227, 98, 252, 106, 228, 47, 32, 126, 201, 218,
                                  199, 120, 118, 223
                                ]
                              }
                            }
                          }
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  84, 114, 97, 110, 99, 104, 101, 65, 100, 100,
                                  114, 101, 115, 115, 101, 115
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvMap', value: 17 },
                          _arm: 'map',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _attributes: {
                                key: {
                                  _switch: { name: 'scvSymbol', value: 15 },
                                  _arm: 'sym',
                                  _armType: { _maxLength: 32 },
                                  _value: {
                                    type: 'Buffer',
                                    data: [97, 100, 100, 114, 115]
                                  }
                                },
                                val: {
                                  _switch: { name: 'scvVec', value: 16 },
                                  _arm: 'vec',
                                  _armType: {
                                    _childType: { _maxLength: 2147483647 }
                                  },
                                  _value: [
                                    {
                                      _switch: {
                                        name: 'scvAddress',
                                        value: 18
                                      },
                                      _arm: 'address',
                                      _value: {
                                        _switch: {
                                          name: 'scAddressTypeContract',
                                          value: 1
                                        },
                                        _arm: 'contractId',
                                        _armType: { _length: 32 },
                                        _value: {
                                          type: 'Buffer',
                                          data: [
                                            238, 142, 175, 164, 41, 195, 109,
                                            171, 24, 216, 252, 147, 93, 51, 48,
                                            220, 110, 147, 32, 133, 6, 5, 117,
                                            118, 204, 42, 126, 76, 148, 24, 29,
                                            247
                                          ]
                                        }
                                      }
                                    },
                                    {
                                      _switch: {
                                        name: 'scvAddress',
                                        value: 18
                                      },
                                      _arm: 'address',
                                      _value: {
                                        _switch: {
                                          name: 'scAddressTypeContract',
                                          value: 1
                                        },
                                        _arm: 'contractId',
                                        _armType: { _length: 32 },
                                        _value: {
                                          type: 'Buffer',
                                          data: [
                                            203, 154, 224, 1, 80, 104, 17, 52,
                                            54, 227, 87, 60, 251, 105, 179, 242,
                                            82, 123, 255, 124, 29, 120, 229, 97,
                                            18, 165, 143, 48, 97, 232, 143, 29
                                          ]
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      _attributes: {
                        key: {
                          _switch: { name: 'scvVec', value: 16 },
                          _arm: 'vec',
                          _armType: { _childType: { _maxLength: 2147483647 } },
                          _value: [
                            {
                              _switch: { name: 'scvSymbol', value: 15 },
                              _arm: 'sym',
                              _armType: { _maxLength: 32 },
                              _value: {
                                type: 'Buffer',
                                data: [
                                  85, 110, 100, 101, 114, 108, 121, 105, 110,
                                  103, 84, 111, 107, 101, 110
                                ]
                              }
                            }
                          ]
                        },
                        val: {
                          _switch: { name: 'scvAddress', value: 18 },
                          _arm: 'address',
                          _value: {
                            _switch: {
                              name: 'scAddressTypeContract',
                              value: 1
                            },
                            _arm: 'contractId',
                            _armType: { _length: 32 },
                            _value: {
                              type: 'Buffer',
                              data: [
                                80, 69, 205, 94, 192, 114, 154, 118, 143, 213,
                                173, 2, 80, 88, 82, 223, 79, 2, 141, 206, 131,
                                14, 90, 197, 34, 9, 186, 72, 72, 59, 47, 1
                              ]
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      },
      liveUntilLedgerSeq: 3809128
    }
  ]
};
