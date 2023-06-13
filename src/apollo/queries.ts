import { gql } from '@apollo/client';

/**
 * Get block number from timestamp
 */
export const BLOCK = gql`
  query GetBlock($timestampFrom: Int!, $timestampTo: Int!) {
    blocks(
      first: 1
      orderBy: timestamp
      orderDirection: asc
      where: { timestamp_gte: $timestampFrom, timestamp_lt: $timestampTo }
    ) {
      number
    }
  }
`;

/**
 * Get top 100 token ids ranked by TVL(USD)
 */
export const TOP_TOKEN_IDS = gql`
  query GetTokenIds {
    tokens(first: 100, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
    }
  }
`;

/**
 * Get current top 100 tokens ranked by TVL(USD)
 */
export const CURRENT_TOKEN_DATA = gql`
  query GetCurrentTokenData($tokenIds: [String]!) {
    tokens(where: { id_in: $tokenIds }, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      name
      symbol
      totalValueLockedUSD
      volumeUSD
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        priceUSD
      }
    }
  }
`;

/**
 * Get top 100 tokens ranked by TVL(USD) for a specific block number
 */
export const BLOCK_TOKEN_DATA = gql`
  query GetBlockTokenData($tokenIds: [String]!, $blockNumber: Int!) {
    tokens(
      where: { id_in: $tokenIds }
      block: { number: $blockNumber }
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      name
      symbol
      totalValueLockedUSD
      volumeUSD
      tokenDayData(first: 1, orderBy: date, orderDirection: desc) {
        priceUSD
      }
    }
  }
`;

/**
 * Get top 100 pool ids ranked by TVL(USD)
 */
export const TOP_POOL_IDS = gql`
  query GetPoolIds {
    pools(first: 100, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
    }
  }
`;

/**
 * Get current top 100 pools ranked by TVL(USD)
 */
export const CURRENT_POOL_DATA = gql`
  query GetCurrentPoolData($poolIds: [String]!) {
    pools(where: { id_in: $poolIds }, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
      totalValueLockedUSD
      volumeUSD
    }
  }
`;

/**
 * Get top 100 pools ranked by TVL(USD) for a specific block number
 */
export const BLOCK_POOL_DATA = gql`
  query GetBlockPoolData($poolIds: [String]!, $blockNumber: Int!) {
    pools(
      where: { id_in: $poolIds }
      block: { number: $blockNumber }
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
      totalValueLockedUSD
      volumeUSD
    }
  }
`;
