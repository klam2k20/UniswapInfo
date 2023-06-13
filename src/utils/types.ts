/** Block Types */
export type Block = {
  number: string;
};

export type BlockData = {
  blocks: Block[];
};

/** Token Types */
export type TokenId = {
  id: string;
};

export type TokenIdData = {
  tokens: TokenId[];
};

export type TokenDayData = {
  priceUSD: string;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  tokenDayData: TokenDayData[];
};

export type TokenData = {
  tokens: Token[];
};

export type FormatToken = {
  id: string;
  name: string;
  symbol: string;
  priceUSD: number;
  tvl: number;
  volume: number;
  priceChange: number;
  volumeChange: number;
};

export type TokenSymbol = {
  symbol: string;
};

/** Pool Types */
export type PoolId = {
  id: string;
};

export type PoolIdData = {
  pools: PoolId[];
};

export type Pool = {
  id: string;
  token0: TokenSymbol;
  token1: TokenSymbol;
  feeTier: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
};

export type PoolData = {
  pools: Pool[];
};

export type FormatPool = {
  id: string;
  token0: string;
  token1: string;
  feeTier: number;
  tvl: number;
  volumeDailyChange: number;
  volumeWeeklyChange: number;
};

/** Transaction Types */
export type TransactionType = {
  origin: string;
  token0: TokenSymbol;
  token1: TokenSymbol;
  amount0: string;
  amount1: string;
  amountUSD: string;
};

export type Transaction = {
  id: string;
  timestamp: string;
  mints: TransactionType;
  burns: TransactionType;
  swaps: TransactionType;
};

export type FormatTransaction = {
  type: string;
  token0: string;
  token1: string;
  amount0: number;
  amount1: number;
  amountUSD: number;
  origin: string;
  time: bigint;
};

/** Class Types */
export type SortType = {
  prop: string;
  asc: boolean;
};
