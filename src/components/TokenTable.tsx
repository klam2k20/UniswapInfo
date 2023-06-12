import { useLazyQuery, useQuery } from '@apollo/client';
import { BLOCK, CURRENT_TOKEN_DATA, BLOCK_TOKEN_DATA, TOP_TOKEN_IDS } from '../apollo/queries';
import { BlockData, FormatToken, TokenData, TokenId, TokenIdData } from '../utils/types';
import { useEffect, useState } from 'react';

const DAY_AGO = Math.floor((Date.now() - 86400000) / 1000);

/**
 * A table to display a token's name, symbol, price (USD), price change, volume (USD) within the pass 24 hours,
 * and total value locked (USD)
 * @returns TSXElement
 */
export function TokenTable() {
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [blockNumber, setBlockNumber] = useState<number>();
  const [tokens, setTokens] = useState<Map<string, FormatToken>>(new Map());

  /**
   * Get top 100 tokens ranked by tvl (USD)
   */
  useQuery<TokenIdData>(TOP_TOKEN_IDS, {
    context: { clientName: 'uniswap' },
    onCompleted: (data) => {
      setTokenIds(data.tokens.map((t: TokenId) => t.id));
    }
  });

  /**
   * Get block for a timestamp 24 hours ago
   */
  useQuery<BlockData>(BLOCK, {
    variables: { timestampFrom: DAY_AGO, timestampTo: DAY_AGO + 300 },
    context: { clientName: 'block' },
    onCompleted: (data) => {
      setBlockNumber(parseInt(data.blocks[0].number));
    }
  });

  /**
   * Get current token data
   */
  const [getCurrentTokenData, { loading, error, data: currentTokenData }] = useLazyQuery<TokenData>(
    CURRENT_TOKEN_DATA,
    {
      variables: { tokenIds },
      context: { clientName: 'uniswap' }
    }
  );

  /**
   * Get token data from 24 hours ago
   */
  const [getBlockTokenData, { loading: blockLoading, error: blockError, data: blockTokenData }] =
    useLazyQuery<TokenData>(BLOCK_TOKEN_DATA, {
      variables: { tokenIds, blockNumber },
      context: { clientName: 'uniswap' }
    });

  useEffect(() => {
    if (tokenIds.length > 0 && blockNumber) {
      getCurrentTokenData();
      getBlockTokenData();
    }
  }, [tokenIds, blockNumber]);

  /**
   * Use current and past token data to create a formatted token data
   */
  useEffect(() => {
    if (!loading && !blockLoading && !error && !blockError && currentTokenData && blockTokenData) {
      const tokens = new Map();
      currentTokenData.tokens.forEach((t) => {
        tokens.set(t.id, {
          name: t.name,
          symbol: t.symbol,
          priceUSD: parseFloat(t.tokenDayData[0].priceUSD),
          tvl: parseFloat(t.totalValueLockedUSD),
          volume: parseFloat(t.volumeUSD)
        });
      });

      blockTokenData.tokens.forEach((t) => {
        const token = tokens.get(t.id);
        const oldPrice = parseFloat(t.tokenDayData[0].priceUSD);
        const oldVolume = parseFloat(t.volumeUSD);
        const priceChange = (token.priceUSD - oldPrice) / oldPrice;
        const volumeChange = token.volume - oldVolume;
        tokens.set(t.id, { ...token, priceChange, volumeChange });
      });

      setTokens(tokens);
    }
  }, [loading, blockLoading, error, blockError, currentTokenData, blockTokenData]);

  return <div></div>;
}
