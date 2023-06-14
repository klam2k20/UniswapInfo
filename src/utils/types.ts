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

export type TokenPriceData = {
  priceUSD: string;
};

export type TokenSymbol = {
  symbol: string;
};

export type Token = {
  id: string;
  name: string;
  symbol: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  tokenDayData: TokenPriceData[];
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

export type TokenDay = {
  date: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  priceUSD: string;
};

export type TokenDayData = {
  tokenDayDatas: TokenDay[];
};

export type FormatTokenDay = {
  date: number;
  volumeUSD: number;
  totalValueLockedUSD: number;
  priceUSD: number;
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

export type PoolDay = {
  date: string;
  token0Price: string;
  token1Price: string;
  tvlUSD: string;
  volumeUSD: string;
};

export type PoolDayData = {
  poolDayDatas: PoolDay[];
};

export type FormatPoolDay = {
  date: number;
  token0: string;
  token1: string;
  token0Price: number;
  token1Price: number;
  tvlUSD: number;
  volumeUSD: number;
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
  mints: TransactionType[];
  burns: TransactionType[];
  swaps: TransactionType[];
};

export type TransactionData = {
  transactions: Transaction[];
};

export type FormatTransaction = {
  id: string;
  type: string;
  token0: string;
  token1: string;
  amount0: number;
  amount1: number;
  amountUSD: number;
  origin: string;
  time: number;
};

/** Class Types */
export type SortType = {
  prop: string;
  asc: boolean;
};

export type ChartPoint = {
  date: number;
  value: number;
};

export type TwoLineChartPoint = {
  date: number;
  name1: string;
  line1: number;
  name2: string;
  line2: number;
};
