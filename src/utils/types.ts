export type TokenId = {
  __typename: 'Token';
  id: string;
};

export type TokenIdData = {
  tokens: TokenId[];
};

export type Block = {
  __typename: 'Block';
  number: string;
};

export type BlockData = {
  blocks: Block[];
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
  name: string;
  symbol: string;
  priceUSD: number;
  tvl: number;
  volume: number;
  priceChange: number;
  volumeChange: number;
};
