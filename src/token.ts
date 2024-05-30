import { Client as UnderlyingTokenClient } from '@huma/underlyingToken';

import { getUnderlyingToken } from './pool';
import { Accounts, findPoolMetadata, getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { Keypair, SorobanRpc } from '@stellar/stellar-sdk';

export const approveToken = async () => {
  const network = Network.localnet;
  // const poolName = 'Arf';
  // const { contracts } = findPoolMetadata(network, poolName);
  // const { address } = await getUnderlyingToken(Network.testnet);

  const borrower = Keypair.fromSecret(
    'SBU4DJJJCGCX5FIZTIODIRXUO4OEULG72WZE55VMTUINGTUQIWLXOEE3'
  );
  const sentinel = Keypair.fromSecret(
    'SDH7ECD5JLBIA2ODSJLQ27MNP6MORG6RYUTZ7UCX47VX7AGOKPTBXPXM'
  );
  const underlyingTokenClient = new UnderlyingTokenClient({
    contractId: 'CB2HLCJ3O3NH7RP3MXEWNPARY6S2G5UHCRZDUOANCFKJ27R34NTVTTYU',
    publicKey: borrower.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    allowHttp: true,
    ...getCustomWallet(borrower.secret())
  });

  const server = new SorobanRpc.Server(PublicRpcUrl[network], {
    allowHttp: true
  });
  const lastedLedger = await server.getLatestLedger();
  console.log('lastedLedger', lastedLedger.sequence);
  const plus = 3000000;

  const tx = await underlyingTokenClient.approve(
    {
      from: borrower.publicKey(),
      spender: sentinel.publicKey(),
      amount: 100000000000n,
      expiration_ledger: lastedLedger.sequence + plus
    },
    {
      timeoutInSeconds: 30
    }
  );
  const { result } = await tx.signAndSend();
  console.log('result', result);
};

export const getAllowance = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  const { address } = await getUnderlyingToken(Network.testnet);

  const underlyingTokenClient = new UnderlyingTokenClient({
    contractId: address,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network]
  });

  const { result } = await underlyingTokenClient.allowance({
    from: Accounts.poolOwner.publicKey(),
    spender: contracts.juniorTranche
  });
  console.log('result', result);
};
