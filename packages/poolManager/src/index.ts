import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CD7GFYAD7O3UZQP5XWOHKZFQS36WWHPHPCOHYQ2UGUP66VJD4GYFTIFK",
  }
} as const

export type ClientDataKey = {tag: "HumaConfig", values: void} | {tag: "Pool", values: void};


export interface HumaConfigChangedEvent {
  huma_config: string;
}


export interface PoolOwnerTreasuryChangedEvent {
  treasury: string;
}


export interface EvaluationAgentChangedEvent {
  new_ea: string;
  old_ea: string;
}


export interface PoolOperatorAddedEvent {
  operator: string;
}


export interface PoolOperatorRemovedEvent {
  operator: string;
}


export interface EvaluationAgentFeesWithdrawalFailedEvent {
  fees: u128;
  old_ea: string;
  reason: string;
}


export interface PoolOwnerRnRChangedEvent {
  liquidity_rate: u32;
  reward_rate: u32;
}


export interface EARnRChangedEvent {
  liquidity_rate: u32;
  reward_rate: u32;
}

export type PoolFeeManagerDataKeys = {tag: "AccruedIncomes", values: void} | {tag: "ProtocolIncomeWithdrawn", values: void} | {tag: "PoolOwnerIncomeWithdrawn", values: void} | {tag: "EAIncomeWithdrawn", values: void};


/**
 * Event indicating that the pool has been enabled.
 * # Fields:
 * * `by` - The address that enabled the pool.
 */
export interface PoolEnabledEvent {
  by: string;
}


/**
 * Event indicating that the pool has been disabled.
 * # Fields:
 * * `by` - The address that disabled the pool.
 */
export interface PoolDisabledEvent {
  by: string;
}


/**
 * Event indicating that the pool has been closed.
 * # Fields:
 * * `by` - The address that closed the pool.
 */
export interface PoolClosedEvent {
  by: string;
}

export type PoolStorageDataKey = {tag: "Status", values: void};

export type PoolStatus = {tag: "Off", values: void} | {tag: "On", values: void} | {tag: "Closed", values: void};


export interface AdminRnR {
  liquidity_rate_bps_ea: u32;
  liquidity_rate_bps_pool_owner: u32;
  reward_rate_bps_ea: u32;
  reward_rate_bps_pool_owner: u32;
}


export interface AccruedIncomes {
  ea_income: u128;
  pool_owner_income: u128;
  protocol_income: u128;
}


export interface WithdrawableFees {
  ea_withdrawable: u128;
  pool_owner_withdrawable: u128;
  protocol_withdrawable: u128;
}

export const Errors = {
  8: {message:""},
  51: {message:""},
  52: {message:""},
  53: {message:""},
  54: {message:""},
  55: {message:""},
  71: {message:""},
  72: {message:""},
  73: {message:""},
  74: {message:""},
  75: {message:""},
  76: {message:""},
  77: {message:""},
  78: {message:""},
  81: {message:""},
  82: {message:""},
  91: {message:""},
  92: {message:""},
  93: {message:""},
  94: {message:""},
  95: {message:""},
  96: {message:""},
  97: {message:""},
  101: {message:""},
  201: {message:""},
  210: {message:""},
  211: {message:""},
  212: {message:""},
  213: {message:""},
  221: {message:""},
  222: {message:""},
  214: {message:""},
  202: {message:""},
  203: {message:""},
  204: {message:""},
  215: {message:""},
  205: {message:""},
  206: {message:""},
  220: {message:""},
  207: {message:""},
  219: {message:""},
  208: {message:""},
  209: {message:""},
  216: {message:""},
  217: {message:""},
  218: {message:""}
}
export type PayPeriodDuration = {tag: "Monthly", values: void} | {tag: "Quarterly", values: void} | {tag: "SemiAnnually", values: void};


export interface PoolSettings {
  default_grace_period_days: u32;
  late_payment_grace_period_days: u32;
  max_credit_line: u128;
  min_deposit_amount: u128;
  pay_period_duration: PayPeriodDuration;
  principal_only_payment_allowed: boolean;
}


export interface LPConfig {
  fixed_senior_yield_bps: u32;
  liquidity_cap: u128;
  max_senior_junior_ratio: u32;
  tranches_risk_adjustment_bps: u32;
  withdrawal_lockout_period_days: u32;
}


export interface FrontLoadingFeeStructure {
  front_loading_fee_bps: u32;
  front_loading_fee_flat: u128;
}


export interface FeeStructure {
  late_fee_bps: u32;
  min_principal_rate_bps: u32;
  yield_bps: u32;
}


export interface TrancheAddresses {
  addrs: Array<Option<string>>;
}


/**
 * The minimum and maximum amount that can be deposited into a tranche.
 */
export interface DepositLimits {
  max: u128;
  min: u128;
}


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({huma_config, pool, pool_owner, pool_owner_treasury, evaluation_agent}: {huma_config: string, pool: string, pool_owner: string, pool_owner_treasury: string, evaluation_agent: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a require_pool_owner_or_huma_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  require_pool_owner_or_huma_owner: ({caller}: {caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a require_pool_operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  require_pool_operator: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a require_protocol_and_pool_on transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  require_protocol_and_pool_on: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a ck_redemption_liquidity_req transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  ck_redemption_liquidity_req: ({lender, tranche, new_balance}: {lender: string, tranche: string, new_balance: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a enable_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  enable_pool: ({caller}: {caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a disable_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  disable_pool: ({caller}: {caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a close_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  close_pool: ({caller}: {caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_huma_config transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_huma_config: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_pool: ({addr, caller}: {addr: string, caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_pool_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_pool_owner: ({addr, caller}: {addr: string, caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_pool_owner_treasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_pool_owner_treasury: ({caller, addr}: {caller: string, addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_evaluation_agent transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_evaluation_agent: ({caller, addr}: {caller: string, addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a add_pool_operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_pool_operator: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a remove_pool_operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_pool_operator: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_pool_owner_rnr transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_pool_owner_rnr: ({caller, reward_rate, liquidity_rate}: {caller: string, reward_rate: u32, liquidity_rate: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a set_ea_rnr transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_ea_rnr: ({caller, reward_rate, liquidity_rate}: {caller: string, reward_rate: u32, liquidity_rate: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a distribute_profit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  distribute_profit: ({profit}: {profit: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw_protocol_fees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_protocol_fees: ({amount}: {amount: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw_pool_owner_fees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_pool_owner_fees: ({amount}: {amount: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a withdraw_ea_fees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  withdraw_ea_fees: ({caller, amount}: {caller: string, amount: u128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_huma_config transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_huma_config: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_pool_owner transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool_owner: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_pool_owner_treasury transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool_owner_treasury: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_evaluation_agent transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_evaluation_agent: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a is_pool_operator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_pool_operator: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a get_admin_rnr transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_admin_rnr: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<AdminRnR>>

  /**
   * Construct and simulate a get_accrued_incomes transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_accrued_incomes: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<AccruedIncomes>>

  /**
   * Construct and simulate a get_withdrawable_fees transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_withdrawable_fees: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<WithdrawableFees>>

  /**
   * Construct and simulate a get_protocol_income_withdrawn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_protocol_income_withdrawn: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u128>>

  /**
   * Construct and simulate a get_pool_owner_income_withdrawn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool_owner_income_withdrawn: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u128>>

  /**
   * Construct and simulate a get_ea_income_withdrawn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_ea_income_withdrawn: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u128>>

  /**
   * Construct and simulate a require_pool_owner_or_sentinel transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  require_pool_owner_or_sentinel: ({caller}: {caller: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_sentinel transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_sentinel: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a get_pool_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_pool_status: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<PoolStatus>>

  /**
   * Construct and simulate a get_available_balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_available_balance: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u128>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAADUNsaWVudERhdGFLZXkAAAAAAAACAAAAAAAAAAAAAAAKSHVtYUNvbmZpZwAAAAAAAAAAAAAAAAAEUG9vbA==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAABQAAAAAAAAALaHVtYV9jb25maWcAAAAAEwAAAAAAAAAEcG9vbAAAABMAAAAAAAAACnBvb2xfb3duZXIAAAAAABMAAAAAAAAAE3Bvb2xfb3duZXJfdHJlYXN1cnkAAAAAEwAAAAAAAAAQZXZhbHVhdGlvbl9hZ2VudAAAABMAAAAA",
        "AAAAAAAAAAAAAAAgcmVxdWlyZV9wb29sX293bmVyX29yX2h1bWFfb3duZXIAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAVcmVxdWlyZV9wb29sX29wZXJhdG9yAAAAAAAAAQAAAAAAAAAEYWRkcgAAABMAAAAA",
        "AAAAAAAAAAAAAAAccmVxdWlyZV9wcm90b2NvbF9hbmRfcG9vbF9vbgAAAAAAAAAA",
        "AAAAAAAAAAAAAAAbY2tfcmVkZW1wdGlvbl9saXF1aWRpdHlfcmVxAAAAAAMAAAAAAAAABmxlbmRlcgAAAAAAEwAAAAAAAAAHdHJhbmNoZQAAAAATAAAAAAAAAAtuZXdfYmFsYW5jZQAAAAAKAAAAAA==",
        "AAAAAAAAAAAAAAALZW5hYmxlX3Bvb2wAAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAMZGlzYWJsZV9wb29sAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAKY2xvc2VfcG9vbAAAAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAPc2V0X2h1bWFfY29uZmlnAAAAAAEAAAAAAAAABGFkZHIAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAIc2V0X3Bvb2wAAAACAAAAAAAAAARhZGRyAAAAEwAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAOc2V0X3Bvb2xfb3duZXIAAAAAAAIAAAAAAAAABGFkZHIAAAATAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAXc2V0X3Bvb2xfb3duZXJfdHJlYXN1cnkAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAARhZGRyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAUc2V0X2V2YWx1YXRpb25fYWdlbnQAAAACAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAABGFkZHIAAAATAAAAAA==",
        "AAAAAAAAAAAAAAARYWRkX3Bvb2xfb3BlcmF0b3IAAAAAAAABAAAAAAAAAARhZGRyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAUcmVtb3ZlX3Bvb2xfb3BlcmF0b3IAAAABAAAAAAAAAARhZGRyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAASc2V0X3Bvb2xfb3duZXJfcm5yAAAAAAADAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAAC3Jld2FyZF9yYXRlAAAAAAQAAAAAAAAADmxpcXVpZGl0eV9yYXRlAAAAAAAEAAAAAA==",
        "AAAAAAAAAAAAAAAKc2V0X2VhX3JucgAAAAAAAwAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAtyZXdhcmRfcmF0ZQAAAAAEAAAAAAAAAA5saXF1aWRpdHlfcmF0ZQAAAAAABAAAAAA=",
        "AAAAAAAAAAAAAAARZGlzdHJpYnV0ZV9wcm9maXQAAAAAAAABAAAAAAAAAAZwcm9maXQAAAAAAAoAAAAA",
        "AAAAAAAAAAAAAAAWd2l0aGRyYXdfcHJvdG9jb2xfZmVlcwAAAAAAAQAAAAAAAAAGYW1vdW50AAAAAAAKAAAAAA==",
        "AAAAAAAAAAAAAAAYd2l0aGRyYXdfcG9vbF9vd25lcl9mZWVzAAAAAQAAAAAAAAAGYW1vdW50AAAAAAAKAAAAAA==",
        "AAAAAAAAAAAAAAAQd2l0aGRyYXdfZWFfZmVlcwAAAAIAAAAAAAAABmNhbGxlcgAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAKAAAAAA==",
        "AAAAAAAAAAAAAAAPZ2V0X2h1bWFfY29uZmlnAAAAAAAAAAABAAAAEw==",
        "AAAAAAAAAAAAAAAIZ2V0X3Bvb2wAAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAOZ2V0X3Bvb2xfb3duZXIAAAAAAAAAAAABAAAAEw==",
        "AAAAAAAAAAAAAAAXZ2V0X3Bvb2xfb3duZXJfdHJlYXN1cnkAAAAAAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAAUZ2V0X2V2YWx1YXRpb25fYWdlbnQAAAAAAAAAAQAAABM=",
        "AAAAAAAAAAAAAAAQaXNfcG9vbF9vcGVyYXRvcgAAAAEAAAAAAAAABGFkZHIAAAATAAAAAQAAAAE=",
        "AAAAAAAAAAAAAAANZ2V0X2FkbWluX3JucgAAAAAAAAAAAAABAAAH0AAAAAhBZG1pblJuUg==",
        "AAAAAAAAAAAAAAATZ2V0X2FjY3J1ZWRfaW5jb21lcwAAAAAAAAAAAQAAB9AAAAAOQWNjcnVlZEluY29tZXMAAA==",
        "AAAAAAAAAAAAAAAVZ2V0X3dpdGhkcmF3YWJsZV9mZWVzAAAAAAAAAAAAAAEAAAfQAAAAEFdpdGhkcmF3YWJsZUZlZXM=",
        "AAAAAAAAAAAAAAAdZ2V0X3Byb3RvY29sX2luY29tZV93aXRoZHJhd24AAAAAAAAAAAAAAQAAAAo=",
        "AAAAAAAAAAAAAAAfZ2V0X3Bvb2xfb3duZXJfaW5jb21lX3dpdGhkcmF3bgAAAAAAAAAAAQAAAAo=",
        "AAAAAAAAAAAAAAAXZ2V0X2VhX2luY29tZV93aXRoZHJhd24AAAAAAAAAAAEAAAAK",
        "AAAAAAAAAAAAAAAecmVxdWlyZV9wb29sX293bmVyX29yX3NlbnRpbmVsAAAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAA",
        "AAAAAAAAAAAAAAAMZ2V0X3NlbnRpbmVsAAAAAAAAAAEAAAAT",
        "AAAAAAAAAAAAAAAPZ2V0X3Bvb2xfc3RhdHVzAAAAAAAAAAABAAAH0AAAAApQb29sU3RhdHVzAAA=",
        "AAAAAAAAAAAAAAAVZ2V0X2F2YWlsYWJsZV9iYWxhbmNlAAAAAAAAAAAAAAEAAAAK",
        "AAAAAQAAAAAAAAAAAAAAFkh1bWFDb25maWdDaGFuZ2VkRXZlbnQAAAAAAAEAAAAAAAAAC2h1bWFfY29uZmlnAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAAHVBvb2xPd25lclRyZWFzdXJ5Q2hhbmdlZEV2ZW50AAAAAAAAAQAAAAAAAAAIdHJlYXN1cnkAAAAT",
        "AAAAAQAAAAAAAAAAAAAAG0V2YWx1YXRpb25BZ2VudENoYW5nZWRFdmVudAAAAAACAAAAAAAAAAZuZXdfZWEAAAAAABMAAAAAAAAABm9sZF9lYQAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAFlBvb2xPcGVyYXRvckFkZGVkRXZlbnQAAAAAAAEAAAAAAAAACG9wZXJhdG9yAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAGFBvb2xPcGVyYXRvclJlbW92ZWRFdmVudAAAAAEAAAAAAAAACG9wZXJhdG9yAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAKEV2YWx1YXRpb25BZ2VudEZlZXNXaXRoZHJhd2FsRmFpbGVkRXZlbnQAAAADAAAAAAAAAARmZWVzAAAACgAAAAAAAAAGb2xkX2VhAAAAAAATAAAAAAAAAAZyZWFzb24AAAAAABA=",
        "AAAAAQAAAAAAAAAAAAAAGFBvb2xPd25lclJuUkNoYW5nZWRFdmVudAAAAAIAAAAAAAAADmxpcXVpZGl0eV9yYXRlAAAAAAAEAAAAAAAAAAtyZXdhcmRfcmF0ZQAAAAAE",
        "AAAAAQAAAAAAAAAAAAAAEUVBUm5SQ2hhbmdlZEV2ZW50AAAAAAAAAgAAAAAAAAAObGlxdWlkaXR5X3JhdGUAAAAAAAQAAAAAAAAAC3Jld2FyZF9yYXRlAAAAAAQ=",
        "AAAAAgAAAAAAAAAAAAAAFlBvb2xGZWVNYW5hZ2VyRGF0YUtleXMAAAAAAAQAAAAAAAAAAAAAAA5BY2NydWVkSW5jb21lcwAAAAAAAAAAAAAAAAAXUHJvdG9jb2xJbmNvbWVXaXRoZHJhd24AAAAAAAAAAAAAAAAYUG9vbE93bmVySW5jb21lV2l0aGRyYXduAAAAAAAAAAAAAAARRUFJbmNvbWVXaXRoZHJhd24AAAA=",
        "AAAAAQAAAGZFdmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHBvb2wgaGFzIGJlZW4gZW5hYmxlZC4KIyBGaWVsZHM6CiogYGJ5YCAtIFRoZSBhZGRyZXNzIHRoYXQgZW5hYmxlZCB0aGUgcG9vbC4AAAAAAAAAAAAQUG9vbEVuYWJsZWRFdmVudAAAAAEAAAAAAAAAAmJ5AAAAAAAT",
        "AAAAAQAAAGhFdmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHBvb2wgaGFzIGJlZW4gZGlzYWJsZWQuCiMgRmllbGRzOgoqIGBieWAgLSBUaGUgYWRkcmVzcyB0aGF0IGRpc2FibGVkIHRoZSBwb29sLgAAAAAAAAARUG9vbERpc2FibGVkRXZlbnQAAAAAAAABAAAAAAAAAAJieQAAAAAAEw==",
        "AAAAAQAAAGRFdmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHBvb2wgaGFzIGJlZW4gY2xvc2VkLgojIEZpZWxkczoKKiBgYnlgIC0gVGhlIGFkZHJlc3MgdGhhdCBjbG9zZWQgdGhlIHBvb2wuAAAAAAAAAA9Qb29sQ2xvc2VkRXZlbnQAAAAAAQAAAAAAAAACYnkAAAAAABM=",
        "AAAAAgAAAAAAAAAAAAAAElBvb2xTdG9yYWdlRGF0YUtleQAAAAAAAQAAAAAAAAAAAAAABlN0YXR1cwAA",
        "AAAAAgAAAAAAAAAAAAAAClBvb2xTdGF0dXMAAAAAAAMAAAAAAAAAAAAAAANPZmYAAAAAAAAAAAAAAAACT24AAAAAAAAAAAAAAAAABkNsb3NlZAAA",
        "AAAAAQAAAAAAAAAAAAAACEFkbWluUm5SAAAABAAAAAAAAAAVbGlxdWlkaXR5X3JhdGVfYnBzX2VhAAAAAAAABAAAAAAAAAAdbGlxdWlkaXR5X3JhdGVfYnBzX3Bvb2xfb3duZXIAAAAAAAAEAAAAAAAAABJyZXdhcmRfcmF0ZV9icHNfZWEAAAAAAAQAAAAAAAAAGnJld2FyZF9yYXRlX2Jwc19wb29sX293bmVyAAAAAAAE",
        "AAAAAQAAAAAAAAAAAAAADkFjY3J1ZWRJbmNvbWVzAAAAAAADAAAAAAAAAAllYV9pbmNvbWUAAAAAAAAKAAAAAAAAABFwb29sX293bmVyX2luY29tZQAAAAAAAAoAAAAAAAAAD3Byb3RvY29sX2luY29tZQAAAAAK",
        "AAAAAQAAAAAAAAAAAAAAEFdpdGhkcmF3YWJsZUZlZXMAAAADAAAAAAAAAA9lYV93aXRoZHJhd2FibGUAAAAACgAAAAAAAAAXcG9vbF9vd25lcl93aXRoZHJhd2FibGUAAAAACgAAAAAAAAAVcHJvdG9jb2xfd2l0aGRyYXdhYmxlAAAAAAAACg==",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAALgAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAAIAAAAAAAAABJaZXJvQW1vdW50UHJvdmlkZWQAAAAAADMAAAAAAAAAC1plcm9QZXJpb2RzAAAAADQAAAAAAAAAIEludmFsaWRCYXNpc1BvaW50SGlnaGVyVGhhbjEwMDAwAAAANQAAAAAAAAAcSW5zdWZmaWNpZW50QW1vdW50Rm9yUmVxdWVzdAAAADYAAAAAAAAAE1Vuc3VwcG9ydGVkRnVuY3Rpb24AAAAANwAAAAAAAAAaQm9ycm93ZXJPclNlbnRpbmVsUmVxdWlyZWQAAAAAAEcAAAAAAAAAHFBvb2xPd25lck9ySHVtYU93bmVyUmVxdWlyZWQAAABIAAAAAAAAABRQb29sT3BlcmF0b3JSZXF1aXJlZAAAAEkAAAAAAAAADlBhdXNlclJlcXVpcmVkAAAAAABKAAAAAAAAABtQb29sT3duZXJPclNlbnRpbmVsUmVxdWlyZWQAAAAASwAAAAAAAAAUQm9ycm93ZXJPckVBUmVxdWlyZWQAAABMAAAAAAAAABBCb3Jyb3dlclJlcXVpcmVkAAAATQAAAAAAAAATUG9vbE1hbmFnZXJSZXF1aXJlZAAAAABOAAAAAAAAAB9Qcm90b2NvbEZlZUhpZ2hlclRoYW5VcHBlckxpbWl0AAAAAFEAAAAAAAAAEFByb3RvY29sSXNQYXVzZWQAAABSAAAAAAAAABZBZG1pblJld2FyZFJhdGVUb29IaWdoAAAAAABbAAAAAAAAABZNaW5EZXBvc2l0QW1vdW50VG9vTG93AAAAAABcAAAAAAAAAB1MYXRlUGF5bWVudEdyYWNlUGVyaW9kVG9vTG9uZwAAAAAAAF0AAAAAAAAAFUludmFsaWRUcmFuY2hlQWRkcmVzcwAAAAAAAF4AAAAAAAAAC1Bvb2xJc05vdE9uAAAAAF8AAAAAAAAAHlBvb2xPd25lckluc3VmZmljaWVudExpcXVpZGl0eQAAAAAAYAAAAAAAAAAkRXZhbHVhdGlvbkFnZW50SW5zdWZmaWNpZW50TGlxdWlkaXR5AAAAYQAAAAAAAAAZU3RhcnREYXRlTGF0ZXJUaGFuRW5kRGF0ZQAAAAAAAGUAAAAAAAAAG0NyZWRpdE5vdEluU3RhdGVGb3JBcHByb3ZhbAAAAADJAAAAAAAAACFDb21taXR0ZWRBbW91bnRFeGNlZWRzQ3JlZGl0TGltaXQAAAAAAADSAAAAAAAAADZDcmVkaXRXaXRob3V0Q29tbWl0bWVudFNob3VsZEhhdmVOb0Rlc2lnbmF0ZWRTdGFydERhdGUAAAAAANMAAAAAAAAAHERlc2lnbmF0ZWRTdGFydERhdGVJblRoZVBhc3QAAADUAAAAAAAAADFQYXlQZXJpb2RzVG9vTG93Rm9yQ3JlZGl0c1dpdGhEZXNpZ25hdGVkU3RhcnREYXRlAAAAAAAA1QAAAAAAAAAgQm9ycm93QW1vdW50TGVzc1RoYW5QbGF0Zm9ybUZlZXMAAADdAAAAAAAAACVBdHRlbXB0ZWREcmF3ZG93bk9uTm9uUmV2b2x2aW5nQ3JlZGl0AAAAAAAA3gAAAAAAAAAeQ29tbWl0dGVkQ3JlZGl0Q2Fubm90QmVTdGFydGVkAAAAAADWAAAAAAAAABNDcmVkaXRMaW1pdEV4Y2VlZGVkAAAAAMoAAAAAAAAAKERyYXdkb3duTm90QWxsb3dlZEluRmluYWxQZXJpb2RBbmRCZXlvbmQAAADLAAAAAAAAACJJbnN1ZmZpY2llbnRQb29sQmFsYW5jZUZvckRyYXdkb3duAAAAAADMAAAAAAAAABVGaXJzdERyYXdkb3duVG9vRWFybHkAAAAAAADXAAAAAAAAABtDcmVkaXROb3RJblN0YXRlRm9yRHJhd2Rvd24AAAAAzQAAAAAAAAArRHJhd2Rvd25Ob3RBbGxvd2VkQWZ0ZXJEdWVEYXRlV2l0aFVucGFpZER1ZQAAAADOAAAAAAAAABJDcmVkaXRMaW1pdFRvb0hpZ2gAAAAAANwAAAAAAAAAIENyZWRpdE5vdEluU3RhdGVGb3JNYWtpbmdQYXltZW50AAAAzwAAAAAAAAApQ3JlZGl0Tm90SW5TdGF0ZUZvck1ha2luZ1ByaW5jaXBhbFBheW1lbnQAAAAAAADbAAAAAAAAAB5EZWZhdWx0SGFzQWxyZWFkeUJlZW5UcmlnZ2VyZWQAAAAAANAAAAAAAAAAGERlZmF1bHRUcmlnZ2VyZWRUb29FYXJseQAAANEAAAAAAAAAGUNyZWRpdE5vdEluU3RhdGVGb3JVcGRhdGUAAAAAAADYAAAAAAAAABtDcmVkaXRIYXNPdXRzdGFuZGluZ0JhbGFuY2UAAAAA2QAAAAAAAAAeQ3JlZGl0SGFzVW5mdWxmaWxsZWRDb21taXRtZW50AAAAAADa",
        "AAAAAgAAAAAAAAAAAAAAEVBheVBlcmlvZER1cmF0aW9uAAAAAAAAAwAAAAAAAAAAAAAAB01vbnRobHkAAAAAAAAAAAAAAAAJUXVhcnRlcmx5AAAAAAAAAAAAAAAAAAAMU2VtaUFubnVhbGx5",
        "AAAAAQAAAAAAAAAAAAAADFBvb2xTZXR0aW5ncwAAAAYAAAAAAAAAGWRlZmF1bHRfZ3JhY2VfcGVyaW9kX2RheXMAAAAAAAAEAAAAAAAAAB5sYXRlX3BheW1lbnRfZ3JhY2VfcGVyaW9kX2RheXMAAAAAAAQAAAAAAAAAD21heF9jcmVkaXRfbGluZQAAAAAKAAAAAAAAABJtaW5fZGVwb3NpdF9hbW91bnQAAAAAAAoAAAAAAAAAE3BheV9wZXJpb2RfZHVyYXRpb24AAAAH0AAAABFQYXlQZXJpb2REdXJhdGlvbgAAAAAAAAAAAAAecHJpbmNpcGFsX29ubHlfcGF5bWVudF9hbGxvd2VkAAAAAAAB",
        "AAAAAQAAAAAAAAAAAAAACExQQ29uZmlnAAAABQAAAAAAAAAWZml4ZWRfc2VuaW9yX3lpZWxkX2JwcwAAAAAABAAAAAAAAAANbGlxdWlkaXR5X2NhcAAAAAAAAAoAAAAAAAAAF21heF9zZW5pb3JfanVuaW9yX3JhdGlvAAAAAAQAAAAAAAAAHHRyYW5jaGVzX3Jpc2tfYWRqdXN0bWVudF9icHMAAAAEAAAAAAAAAB53aXRoZHJhd2FsX2xvY2tvdXRfcGVyaW9kX2RheXMAAAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAAGEZyb250TG9hZGluZ0ZlZVN0cnVjdHVyZQAAAAIAAAAAAAAAFWZyb250X2xvYWRpbmdfZmVlX2JwcwAAAAAAAAQAAAAAAAAAFmZyb250X2xvYWRpbmdfZmVlX2ZsYXQAAAAAAAo=",
        "AAAAAQAAAAAAAAAAAAAADEZlZVN0cnVjdHVyZQAAAAMAAAAAAAAADGxhdGVfZmVlX2JwcwAAAAQAAAAAAAAAFm1pbl9wcmluY2lwYWxfcmF0ZV9icHMAAAAAAAQAAAAAAAAACXlpZWxkX2JwcwAAAAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAAEFRyYW5jaGVBZGRyZXNzZXMAAAABAAAAAAAAAAVhZGRycwAAAAAAA+oAAAPoAAAAEw==",
        "AAAAAQAAAERUaGUgbWluaW11bSBhbmQgbWF4aW11bSBhbW91bnQgdGhhdCBjYW4gYmUgZGVwb3NpdGVkIGludG8gYSB0cmFuY2hlLgAAAAAAAAANRGVwb3NpdExpbWl0cwAAAAAAAAIAAAAAAAAAA21heAAAAAAKAAAAAAAAAANtaW4AAAAACg==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        require_pool_owner_or_huma_owner: this.txFromJSON<null>,
        require_pool_operator: this.txFromJSON<null>,
        require_protocol_and_pool_on: this.txFromJSON<null>,
        ck_redemption_liquidity_req: this.txFromJSON<null>,
        enable_pool: this.txFromJSON<null>,
        disable_pool: this.txFromJSON<null>,
        close_pool: this.txFromJSON<null>,
        set_huma_config: this.txFromJSON<null>,
        set_pool: this.txFromJSON<null>,
        set_pool_owner: this.txFromJSON<null>,
        set_pool_owner_treasury: this.txFromJSON<null>,
        set_evaluation_agent: this.txFromJSON<null>,
        add_pool_operator: this.txFromJSON<null>,
        remove_pool_operator: this.txFromJSON<null>,
        set_pool_owner_rnr: this.txFromJSON<null>,
        set_ea_rnr: this.txFromJSON<null>,
        distribute_profit: this.txFromJSON<null>,
        withdraw_protocol_fees: this.txFromJSON<null>,
        withdraw_pool_owner_fees: this.txFromJSON<null>,
        withdraw_ea_fees: this.txFromJSON<null>,
        get_huma_config: this.txFromJSON<string>,
        get_pool: this.txFromJSON<string>,
        get_pool_owner: this.txFromJSON<string>,
        get_pool_owner_treasury: this.txFromJSON<string>,
        get_evaluation_agent: this.txFromJSON<string>,
        is_pool_operator: this.txFromJSON<boolean>,
        get_admin_rnr: this.txFromJSON<AdminRnR>,
        get_accrued_incomes: this.txFromJSON<AccruedIncomes>,
        get_withdrawable_fees: this.txFromJSON<WithdrawableFees>,
        get_protocol_income_withdrawn: this.txFromJSON<u128>,
        get_pool_owner_income_withdrawn: this.txFromJSON<u128>,
        get_ea_income_withdrawn: this.txFromJSON<u128>,
        require_pool_owner_or_sentinel: this.txFromJSON<null>,
        get_sentinel: this.txFromJSON<string>,
        get_pool_status: this.txFromJSON<PoolStatus>,
        get_available_balance: this.txFromJSON<u128>
  }
}