import { Client as UnderlyingTokenClient } from '@huma/underlyingToken';

import { getUnderlyingToken } from './pool';
import { Accounts, findPoolMetadata, getCustomWallet } from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';

export const approveToken = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);
  const { address } = await getUnderlyingToken();

  const underlyingTokenClient = new UnderlyingTokenClient({
    contractId: address,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    ...getCustomWallet(Accounts.poolOwner.secret())
  });

  const tx = await underlyingTokenClient.approve(
    {
      from: Accounts.poolOwner.publicKey(),
      spender: contracts.pool,
      amount: 100000000000n,
      expiration_ledger: 1532661
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
  const { address } = await getUnderlyingToken();

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
