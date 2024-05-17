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

(async () => {
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

  const getLedgerKeySymbol = (contractId: string, symbolText: string) => {
    const ledgerKey = xdr.LedgerKey.contractData(
      new xdr.LedgerKeyContractData({
        contract: new Address(contractId).toScAddress(),
        key: xdr.ScVal.scvSymbol(symbolText),
        durability: xdr.ContractDataDurability.persistent()
      })
    );
    return ledgerKey;
  };
  const keys = getLedgerKeySymbol(
    'CCVRLKWWSYYFAEOCMLH5BT5B3SWCJSO6SMB5S3LOZ5BMKE6D6PTCXJRL',
    'COUNTER'
  );

  const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');
  const entries = await server.getLedgerEntries(keys);
  console.log(entries);

  const test = {
    lastModifiedLedgerSeq: 1654683,
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
                171, 21, 170, 214, 150, 48, 80, 17, 194, 98, 207, 208, 207, 161,
                220, 172, 36, 201, 222, 147, 3, 217, 109, 110, 207, 66, 197, 19,
                195, 243, 230, 43
              ]
            }
          },
          key: { _switch: { name: 'scvLedgerKeyContractInstance', value: 20 } },
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
                171, 21, 170, 214, 150, 48, 80, 17, 194, 98, 207, 208, 207, 161,
                220, 172, 36, 201, 222, 147, 3, 217, 109, 110, 207, 66, 197, 19,
                195, 243, 230, 43
              ]
            }
          },
          key: { _switch: { name: 'scvLedgerKeyContractInstance', value: 20 } },
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
                      225, 12, 244, 82, 102, 132, 179, 43, 249, 26, 231, 20,
                      199, 200, 153, 80, 193, 24, 151, 160, 42, 162, 63, 30,
                      122, 144, 57, 60, 181, 78, 108, 101
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    liveUntilLedgerSeq: 3728282
  };

  // const parsed = xdr.LedgerEntryData.fromXDR(
  //   'AAAABgAAAAAAAAABzAP+dP0PsNzYvFF1pv7a8RQXwH5eg3uZBbbWjE9PwAsAAAAQAAAAAQAAAAIAAAAPAAAAB0NvdW50ZXIAAAAAEgAAAAAAAAAAIOHWwMbBgBiAnwRt4k9nChmEOoSuLCVs2eqK9Qub+hgAAAABAAAAAwAAAAw=',
  //   'base64'
  // );

  // decodeScValString([67, 111, 117, 110, 116, 101, 114]);
  // decodeScValString([
  //   204, 3, 254, 116, 253, 15, 176, 220, 216, 188, 81, 117, 166, 254, 218, 241,
  //   20, 23, 192, 126, 94, 131, 123, 153, 5, 182, 214, 140, 79, 79, 192, 11
  // ]);

  // const parsed = {
  //   _switch: { name: 'contractData', value: 6 },
  //   _arm: 'contractData',
  //   _value: {
  //     _attributes: {
  //       ext: { _switch: 0 },
  //       contract: {
  //         _switch: { name: 'scAddressTypeContract', value: 1 },
  //         _arm: 'contractId',
  //         _armType: { _length: 32 },
  //         _value: {
  //           type: 'Buffer',
  //           data: [
  //             204, 3, 254, 116, 253, 15, 176, 220, 216, 188, 81, 117, 166, 254,
  //             218, 241, 20, 23, 192, 126, 94, 131, 123, 153, 5, 182, 214, 140,
  //             79, 79, 192, 11
  //           ]
  //         }
  //       },
  //       key: {
  //         _switch: { name: 'scvVec', value: 16 },
  //         _arm: 'vec',
  //         _armType: { _childType: { _maxLength: 2147483647 } },
  //         _value: [
  //           {
  //             _switch: { name: 'scvSymbol', value: 15 },
  //             _arm: 'sym',
  //             _armType: { _maxLength: 32 },
  //             _value: {
  //               type: 'Buffer',
  //               data: [67, 111, 117, 110, 116, 101, 114]
  //             }
  //           },
  //           {
  //             _switch: { name: 'scvAddress', value: 18 },
  //             _arm: 'address',
  //             _value: {
  //               _switch: { name: 'scAddressTypeAccount', value: 0 },
  //               _arm: 'accountId',
  //               _value: {
  //                 _switch: { name: 'publicKeyTypeEd25519', value: 0 },
  //                 _arm: 'ed25519',
  //                 _armType: { _length: 32 },
  //                 _value: {
  //                   type: 'Buffer',
  //                   data: [
  //                     32, 225, 214, 192, 198, 193, 128, 24, 128, 159, 4, 109,
  //                     226, 79, 103, 10, 25, 132, 58, 132, 174, 44, 37, 108, 217,
  //                     234, 138, 245, 11, 155, 250, 24
  //                   ]
  //                 }
  //               }
  //             }
  //           }
  //         ]
  //       },
  //       durability: { name: 'persistent', value: 1 },
  //       val: { _switch: { name: 'scvU32', value: 3 }, _arm: 'u32', _value: 12 }
  //     }
  //   }
  // };

  // console.log(JSON.stringify(parsed));
})();
