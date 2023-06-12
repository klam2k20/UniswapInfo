import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

/**
 * Endpoint to query Uniswap Subgraph V3 for token, pool and
 * transaction data
 */
const uniswapEndpoint = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
});

/**
 * Endpoint to query for block number from given timestamp - needed to
 * get token and pool data for a specific time
 */
const blockEndpoint = new HttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
});

export const client = new ApolloClient({
  link: ApolloLink.split(
    (op) => op.getContext().clientName === 'uniswap',
    uniswapEndpoint,
    blockEndpoint
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});
