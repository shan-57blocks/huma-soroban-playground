import axios from 'axios';
import {
  extendInstanceTTL,
  extendPersistentTTL,
  restoreInstanceTTL
} from './extendTTL';
import { genContracts, getCustomWallet } from './utils/common';
import {
  Network,
  NetworkPassphrase,
  POOL_NAME,
  PublicRpcUrl
} from './utils/network';
import { Keypair, SorobanRpc } from '@stellar/stellar-sdk';
import { Client as UnderlyingTokenClient } from '@huma-finance/soroban-sep41';
import { Client as TrancheVaultClient } from '@huma-finance/soroban-tranche-vault';
import { Client as PoolManagerClient } from '@huma-finance/soroban-pool-manager';
import { Client as CreditManagerClient } from '@huma-finance/soroban-credit-manager';
import { Client as PoolCreditClient } from '@huma-finance/soroban-pool-credit';

(async () => {
  const network = Network.testnet;
  const poolName = POOL_NAME.Arf;

  const lender = Keypair.fromSecret(
    'SAACA57BHHGHRFRK4ABLZH57V2ZP7JIHMFTX2Z2MDOOQ7H7FNPCJJWHU'
  );
  const poolOwner = Keypair.fromSecret(
    'SCS43KPAQZ2J22DYMAFJQVFTPWZQ6RBYL332PEBCPBJ6ZHAF3PMR2VLC'
  );
  const borrower = Keypair.fromSecret(
    'SD7SSLWZBOCST4QEOEYQZDSPKNRNAIMWJEBXRS7EF6KQTVH66B7SLXXR'
  );

  // const poolCreditClient = new PoolCreditClient({
  //   contractId: 'CCYWDOW34SPB3FCR6A633B5GS5DPRRQKTTCT4DU7YYFDRT7XBOA2HYYY',
  //   publicKey: borrower.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(borrower.secret())
  // });

  // const tx = await poolCreditClient.make_payment(
  //   {
  //     caller: borrower.publicKey(),
  //     borrower: borrower.publicKey(),
  //     amount: 400000000n
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );

  // await tx.signAndSend();

  // const poolCreditClient = new PoolCreditClient({
  //   contractId: 'CCYWDOW34SPB3FCR6A633B5GS5DPRRQKTTCT4DU7YYFDRT7XBOA2HYYY',
  //   publicKey: borrower.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(borrower.secret())
  // });

  // const tx = await poolCreditClient.drawdown(
  //   {
  //     borrower: borrower.publicKey(),
  //     amount: 100000000n
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );

  // await tx.signAndSend();

  const creditManagerClient = new CreditManagerClient({
    contractId: 'CDHYIC3ISV3F3RL7FROC3SI2GW65ZOJHMA2AMZJYLIRLWSDELFF3CR23',
    publicKey: poolOwner.publicKey(),
    networkPassphrase: NetworkPassphrase[network],
    rpcUrl: PublicRpcUrl[network],
    ...getCustomWallet(poolOwner.secret())
  });

  const tx = await creditManagerClient.approve_borrower(
    {
      borrower: 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7',
      credit_limit: 1000000000n,
      num_periods: 5,
      yield_bps: 1200,
      committed_amount: 0n,
      designated_start_date: 0n,
      revolving: true
    },
    {
      timeoutInSeconds: 30
    }
  );

  await tx.signAndSend();

  // const poolManagerClient = new PoolManagerClient({
  //   contractId: 'CCTCNYWWKPVFNPJDQUMJM6GFBU6IJSZH6CHPM5COJTBMWO64A4XVCXNV',
  //   publicKey: poolOwner.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(poolOwner.secret())
  // });

  // const tx = await poolManagerClient.enable_pool(
  //   {
  //     caller: poolOwner.publicKey()
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );

  // await tx.signAndSend();

  // const trancheVaultClient = new TrancheVaultClient({
  //   contractId: 'CAJZ4V2N5TOJ6GVOJOKTJSP3QYDNVC6O6TDO2V64GULQGZNRRFM5AS7V',
  //   publicKey: lender.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(lender.secret())
  // });

  // const tx = await trancheVaultClient.deposit(
  //   {
  //     lender: lender.publicKey(),
  //     assets: 1000000000n
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );

  // await tx.signAndSend();
  // const server = new SorobanRpc.Server(PublicRpcUrl[network], {
  //   allowHttp: true
  // });
  // const latestLedger = await server.getLatestLedger();
  // const underlyingTokenClient = new UnderlyingTokenClient({
  //   contractId: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  //   publicKey: borrower.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(borrower.secret())
  // });

  // const tx = await underlyingTokenClient.approve(
  //   {
  //     from: borrower.publicKey(),
  //     spender: 'GCJOREE3MWDTANSP4CRM6HZYMQTCZLOYUR6L3XFR34FP4R37WMR5NHWC',
  //     amount: 10000_000_000n,
  //     expiration_ledger: latestLedger.sequence + 3_000_000
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );
  // await tx.signAndSend();

  // const sender = Keypair.fromSecret(
  //   'SAACA57BHHGHRFRK4ABLZH57V2ZP7JIHMFTX2Z2MDOOQ7H7FNPCJJWHU'
  // );
  // const lender = Keypair.fromSecret(
  //   'SCS43KPAQZ2J22DYMAFJQVFTPWZQ6RBYL332PEBCPBJ6ZHAF3PMR2VLC'
  // );
  // const underlyingTokenClient = new UnderlyingTokenClient({
  //   contractId: 'CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA',
  //   publicKey: sender.publicKey(),
  //   networkPassphrase: NetworkPassphrase[network],
  //   rpcUrl: PublicRpcUrl[network],
  //   ...getCustomWallet(sender.secret())
  // });

  // const tx = await underlyingTokenClient.transfer(
  //   {
  //     from: sender.publicKey(),
  //     to: lender.publicKey(),
  //     amount: 500000000n
  //   },
  //   {
  //     timeoutInSeconds: 30
  //   }
  // );

  // await tx.signAndSend();

  // const { result: balance } = await underlyingTokenClient.balance({
  //   id: lender.publicKey()
  // });

  // console.log('balance', balance);

  // console.log(
  //   Keypair.fromSecret(
  //     'SCI4G3HRJO2OEP464IDYENTBMKBT3PDFYEK5RSVRO35ECL6X3VQ4EJOS'
  //   ).publicKey()
  // );
  // return;
  // const lender = 'GBK62KZMUVEKLGGB3UYCRUP2BVDUE6UEZWUHPUNJ54BKFDTW4CNSF6O7';
  // await approveLender(network, poolName, lender);

  // await restoreInstanceTTL(network, poolName);
  // await extendInstanceTTL(network, poolName);
  // await extendPersistentTTL(network, poolName);
  // await restoreAndExtendInstanceTTL(network, poolName);
  // genContracts();
})();
