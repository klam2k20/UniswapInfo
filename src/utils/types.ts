/** Block Types */
export type Block = {
  __typename: 'Block';
  number: string;
};

export type BlockData = {
  blocks: Block[];
};

/** Token Types */
export type TokenId = {
  __typename: 'Token';
  id: string;
};

export type TokenIdData = {
  tokens: TokenId[];
};

export type TokenDayData = {
  __typename: 'TokenDayData';
  priceUSD: string;
};

export type Token = {
  __typename: 'Token';
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

/** Pool Types */
export type PoolId = {
  __typename: 'Pool';
  id: string;
};

export type PoolIdData = {
  pools: PoolId[];
};

export type PoolToken = {
  symbol: string;
};

export type Pool = {
  __typename: 'Pool';
  id: string;
  token0: PoolToken;
  token1: PoolToken;
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

export type SortType = {
  prop: string;
  asc: boolean;
};
