import { getTrancheVaultClient } from './utils/client';
import { Accounts, getCustomWallet } from './utils/common';
import { Network, POOL_NAME } from './utils/network';

export const approveLender = async (
  network: Network,
  poolName: POOL_NAME,
  lender: string
) => {
  await approveLenderByTranche(network, poolName, 'junior', lender);
  await approveLenderByTranche(network, poolName, 'senior', lender);
};

export const approveLenderByTranche = async (
  network: Network,
  poolName: POOL_NAME,
  tranche: 'junior' | 'senior',
  lender: string
) => {
  const poolOperator = Accounts[network].poolOperator;
  const trancheClient = getTrancheVaultClient(
    network,
    poolName,
    poolOperator.publicKey(),
    tranche,
    getCustomWallet(poolOperator.secret())
  );

  const { result } = await trancheClient.balance_of({
    account: lender
  });

  console.log('approveLenderByTranche', tranche, 'done', result);

  //   const tx = await trancheClient.add_approved_lender(
  //     {
  //       caller: poolOperator.publicKey(),
  //       lender: lender
  //     },
  //     {
  //       timeoutInSeconds: 30
  //     }
  //   );
  //   await tx.signAndSend();
  //   console.log('approveLenderByTranche', tranche, 'done');
};
