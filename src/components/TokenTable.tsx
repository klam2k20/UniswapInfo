import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { BLOCK, BLOCK_TOKEN_DATA, CURRENT_TOKEN_DATA, TOP_TOKEN_IDS } from '../apollo/queries';
import { BlockData, FormatToken, TokenData, TokenId, TokenIdData } from '../utils/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import TokenRow from './TokenRow';
import { LoadingList, LoadingPagination } from './LoadingStates';
import { ErrorList } from './ErrorStates';

const DAY_AGO = Math.floor((Date.now() - 86400000) / 1000);

export const TokenTable = () => {
  const [tokenIds, setTokenIds] = useState<string[]>([]);
  const [blockNumber, setBlockNumber] = useState<number>();
  const [tokens, setTokens] = useState<FormatToken[]>([]);
  const [page, setPage] = useState<number>(1);

  /**
   * Get top 100 tokens ranked by tvl (USD)
   */
  const { loading: tokenIdLoading, error: tokenIdError } = useQuery<TokenIdData>(TOP_TOKEN_IDS, {
    context: { clientName: 'uniswap' },
    onCompleted: (data) => {
      setTokenIds(data?.tokens?.map((t: TokenId) => t.id) || []);
    }
  });

  /**
   * Get block for a timestamp 24 hours ago
   */
  const { loading: blockNumberLoading, error: blockNumberError } = useQuery<BlockData>(BLOCK, {
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
  const [
    getBlockTokenData,
    { loading: blockTokenLoading, error: blockTokenError, data: blockTokenData }
  ] = useLazyQuery<TokenData>(BLOCK_TOKEN_DATA, {
    variables: { tokenIds, blockNumber },
    context: { clientName: 'uniswap' }
  });

  /**
   * Get current and past 24 hour token data once token ids and block number
   * is obtained
   */
  useEffect(() => {
    if (tokenIds.length > 0 && blockNumber) {
      getCurrentTokenData();
      getBlockTokenData();
    }
  }, [tokenIdLoading, blockNumberLoading, tokenIdError, blockNumberError, tokenIds, blockNumber]);

  /**
   * Use current and past token data to create a formatted token data
   */
  useEffect(() => {
    if (
      !loading &&
      !blockTokenLoading &&
      !error &&
      !blockTokenError &&
      currentTokenData &&
      blockTokenData
    ) {
      const tokenMap = new Map();
      currentTokenData.tokens.forEach((t) => {
        tokenMap.set(t.id, {
          name: t.name,
          symbol: t.symbol,
          priceUSD: parseFloat(t.tokenDayData[0].priceUSD),
          tvl: parseFloat(t.totalValueLockedUSD),
          volume: parseFloat(t.volumeUSD)
        });
      });

      blockTokenData.tokens.forEach((t) => {
        const token = tokenMap.get(t.id);
        const oldPrice = parseFloat(t.tokenDayData[0].priceUSD);
        const oldVolume = parseFloat(t.volumeUSD);
        const priceChange = oldPrice > 0 ? ((token.priceUSD - oldPrice) / oldPrice) * 100 : 0;
        const volumeChange = token.volume - oldVolume;
        tokenMap.set(t.id, { ...token, priceChange, volumeChange });
      });

      setTokens(Array.from(tokenMap, ([key, value]) => ({ id: key, ...value })));
    }
  }, [loading, blockTokenLoading, error, blockTokenError, currentTokenData, blockTokenData]);

  /**
   * Handles pagination for the table
   * @param dir represents which direction was clicked
   */
  const handlePage = (dir: string) => {
    if (dir === 'left' && page > 1) {
      setPage((prev) => prev - 1);
    } else if (dir === 'right' && page < Math.ceil(tokens.length / 10)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="table_header">Top Tokens</h1>
      <div className="table_list">
        <div className="token_grid">
          <span className="md_show left_align text-zinc-300">#</span>
          <span className="left_align text-zinc-300">Name</span>
          <span className="right_align text-zinc-300">Price</span>
          <span className="lg_show right_align text-zinc-300">Price Change</span>
          <span className="md_show right_align text-zinc-300">Volume 24H</span>
          <span className="lg_show right_align text-zinc-300">TVL</span>
        </div>

        {/* Loading States */}
        {(tokenIdLoading || blockNumberLoading || loading || blockTokenLoading) && (
          <>
            <LoadingList />
            <LoadingPagination />
          </>
        )}

        {/* Error State */}
        {(tokenIdError || blockNumberError || error || blockTokenError) && <ErrorList />}

        {!tokenIdLoading &&
          !blockNumberLoading &&
          !loading &&
          !blockTokenLoading &&
          !tokenIdError &&
          !blockNumberError &&
          !error &&
          !blockTokenError && (
            <>
              {tokens.slice((page - 1) * 10, page * 10).map((t, i) => (
                <TokenRow key={t.id} token={t} index={(page - 1) * 10 + i + 1} />
              ))}

              <div className="table_pagination">
                <ArrowLeftIcon
                  className={page === 1 ? 'disabled_arrow' : 'arrow'}
                  onClick={() => handlePage('left')}
                />
                {`Page ${page} of ${Math.ceil(tokens.length / 10)}`}
                <ArrowRightIcon
                  className={page === Math.ceil(tokens.length / 10) ? 'disabled_arrow' : 'arrow'}
                  onClick={() => handlePage('right')}
                />
              </div>
            </>
          )}
      </div>
    </section>
  );
};
