import { gql } from '@apollo/client';

export const TOP_TOKENS = gql`
  query GetTokens {
    tokens(first: 100, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      symbol
      name
      totalValueLockedUSD
      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        date
        priceUSD
      }
    }
  }
`;
