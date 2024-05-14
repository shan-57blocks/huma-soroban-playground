import { PayPeriodDuration, Client as PoolClient } from '@huma/pool';
import { Client as UnderlyingTokenClient } from '@huma/underlyingToken';
import { scValToNative } from '@stellar/stellar-sdk';

import {
  Accounts,
  findPoolMetadata,
  ScValType,
  toScVal,
  getCustomWallet
} from './utils/common';
import { Network, NetworkPassphrase, PublicRpcUrl } from './utils/network';
import { sendTransaction, simTransaction } from './utils/transaction';

export const getPoolInfo = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolClient = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network]
  });

  const [
    { result: juniorTrancheDepositLimit },
    { result: seniorTrancheDepositLimit },
    { result: juniorTrancheCap },
    { result: seniorTrancheCap },
    { result: lpConfig },
    { result: trancheAssets }
  ] = await Promise.all([
    poolClient.get_tranche_deposit_limits({
      addr: contracts.juniorTranche
    }),
    poolClient.get_tranche_deposit_limits({
      addr: contracts.seniorTranche
    }),
    poolClient.get_tranche_available_cap({
      index: 0
    }),
    poolClient.get_tranche_available_cap({
      index: 1
    }),
    poolClient.get_lp_config(),
    poolClient.get_tranche_assets()
  ]);

  console.log('juniorTrancheDepositLimit', juniorTrancheDepositLimit);
  console.log('seniorTrancheDepositLimit', seniorTrancheDepositLimit);
  console.log('juniorTrancheCap', juniorTrancheCap);
  console.log('seniorTrancheCap', seniorTrancheCap);
  console.log('lpConfig', lpConfig);
  console.log('trancheAssets', trancheAssets);
};

export const getUnderlyingToken = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const pool = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result: underlyingTokenAddress } =
      await pool.get_underlying_token();
    const symbol = await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      underlyingTokenAddress,
      'symbol'
    );
    const decimals = await sendTransaction(
      Accounts.poolOwner.secret(),
      network,
      underlyingTokenAddress,
      'decimals'
    );
    const underlyingToken = {
      address: underlyingTokenAddress,
      symbol: scValToNative(symbol),
      decimals: scValToNative(decimals)
    };
    return underlyingToken;
  } catch (e) {
    console.error('Error', e);
  }
};

export const underlyingTokenBalanceOf = async (account: string) => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const pool = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result: underlyingTokenAddress } =
      await pool.get_underlying_token();
    const balance = await sendTransaction(
      Accounts.lender.secret(),
      network,
      underlyingTokenAddress,
      'balance',
      [toScVal(account, ScValType.address)]
    );
    console.log('balance', Number(scValToNative(balance)) / 10000000);
  } catch (e) {
    console.error('Error', e);
  }
};

export const underlyingTokenTransfer = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolClient = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.lender.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet
  });
  try {
    const { result: underlyingTokenAddress } =
      await poolClient.get_underlying_token();

    const underlyingTokenClient = new UnderlyingTokenClient({
      contractId: underlyingTokenAddress,
      publicKey: Accounts.poolOwner.publicKey(),
      networkPassphrase: NetworkPassphrase.testnet,
      rpcUrl: PublicRpcUrl.testnet,
      ...getCustomWallet(Accounts.poolOwner.secret())
    });

    const tx = await underlyingTokenClient.transfer(
      {
        from: Accounts.poolOwner.publicKey(),
        to: 'CA525T5NVARC4VHMBURM56O7EFMZ4PSMYCOTFTZPHAYQTVD2A35WFEPQ',
        amount: 100_000_000n
      },
      {
        timeoutInSeconds: 30
      }
    );

    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

export const setPoolSettings = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  // const poolClient = new PoolClient({
  //   contractId: contracts.pool,
  //   publicKey: Accounts.poolOwner.publicKey(),
  //   networkPassphrase: NetworkPassphrase.testnet,
  //   rpcUrl: PublicRpcUrl.testnet,
  //   ...getCustomWallet(Accounts.poolOwner.secret())
  // });

  // try {
  //   const monthly: PayPeriodDuration = {
  //     tag: 'Monthly',
  //     values: void 0
  //   };
  //   const tx = await poolClient.set_pool_settings(
  //     {
  //       caller: Accounts.poolOwner.publicKey(),
  //       max_credit_line: 10000000000000n,
  //       min_deposit_amount: 100000000n,
  //       pay_period_duration: monthly,
  //       late_payment_grace_period_days: 5,
  //       default_grace_period_days: 10,
  //       principal_only_payment_allowed: true
  //     },
  //     {
  //       timeoutInSeconds: 30
  //     }
  //   );

  //   const { result } = await tx.signAndSend();
  //   console.log('result', result);
  // } catch (e) {
  //   console.error('Error', e);
  // }

  try {
    await simTransaction(
      Accounts.poolOwner.secret(),
      network,
      contracts.pool,
      'set_pool_settings',
      [
        toScVal(Accounts.poolOwner.publicKey(), ScValType.address),
        toScVal(10000000000000, ScValType.u128),
        toScVal(100000000, ScValType.u128),
        toScVal('Monthly', ScValType.enum),
        toScVal(5, ScValType.u32),
        toScVal(10, ScValType.u32),
        toScVal(true, ScValType.bool)
      ]
    );
  } catch (e) {
    console.error('Error', e);
  }
};

export const setLpConfig = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolClient = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...getCustomWallet(Accounts.poolOwner.secret())
  });
  try {
    const tx = await poolClient.set_lp_config(
      {
        caller: Accounts.poolOwner.publicKey(),
        liquidity_cap: 100000000000000n,
        max_senior_junior_ratio: 4,
        fixed_senior_yield_bps: 800,
        tranches_risk_adjustment_bps: 0,
        withdrawal_lockout_period_days: 0
      },
      {
        timeoutInSeconds: 30
      }
    );

    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};

export const setFeeStructure = async () => {
  const network = Network.testnet;
  const poolName = 'Arf';
  const { contracts } = findPoolMetadata(network, poolName);

  const poolClient = new PoolClient({
    contractId: contracts.pool,
    publicKey: Accounts.poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase.testnet,
    rpcUrl: PublicRpcUrl.testnet,
    ...getCustomWallet(Accounts.poolOwner.secret())
  });
  try {
    const tx = await poolClient.set_fee_structure(
      {
        caller: Accounts.poolOwner.publicKey(),
        yield_bps: 1500,
        min_principal_rate_bps: 0,
        late_fee_bps: 100
      },
      {
        timeoutInSeconds: 30
      }
    );

    const { result } = await tx.signAndSend();
    console.log('result', result);
  } catch (e) {
    console.error('Error', e);
  }
};
