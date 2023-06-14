import { useLazyQuery, useQuery } from '@apollo/client';
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { BLOCK, BLOCK_POOL_DATA, CURRENT_POOL_DATA, TOP_POOL_IDS } from '../../apollo/queries';
import { BlockData, FormatPool, PoolData, PoolId, PoolIdData, SortType } from '../../utils/types';
import { sortPools } from '../../utils/utils';
import { ErrorList } from '../ErrorStates';
import { LoadingList, LoadingPagination } from '../LoadingStates';
import TableColHeader from '../TableColHeader';
import PoolRow from './PoolRow';

const DAY_AGO = Math.floor((Date.now() - 86400000) / 1000);
const WEEK_AGO = Math.floor((Date.now() - 604800000) / 1000);

interface IPoolTableProps {
  limitPerPage: number;
}

const PoolTable = ({ limitPerPage }: IPoolTableProps) => {
  const [poolIds, setPoolIds] = useState<string[]>([]);
  const [blockDailyNumber, setBlockDailyNumber] = useState<number>();
  const [blockWeeklyNumber, setBlockWeeklyNumber] = useState<number>();
  const [pools, setPools] = useState<FormatPool[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<SortType>({ prop: 'tvl', asc: false });

  /**
   * Get top 100 pools ranked by tvl (USD)
   */
  const { loading: poolIdLoading, error: poolIdError } = useQuery<PoolIdData>(TOP_POOL_IDS, {
    context: { clientName: 'uniswap' },
    onCompleted: (data) => {
      setPoolIds(data?.pools?.map((p: PoolId) => p.id) || []);
    }
  });

  /**
   * Get block for a timestamp 24 hours ago
   */
  const { loading: blockDailyNumberLoading, error: blockDailyNumberError } = useQuery<BlockData>(
    BLOCK,
    {
      variables: { timestampFrom: DAY_AGO, timestampTo: DAY_AGO + 300 },
      context: { clientName: 'block' },
      onCompleted: (data) => {
        setBlockDailyNumber(parseInt(data.blocks[0].number));
      }
    }
  );

  /**
   * Get block for a timestamp 1 week ago
   */
  const { loading: blockWeeklyNumberLoading, error: blockWeeklyNumberError } = useQuery<BlockData>(
    BLOCK,
    {
      variables: { timestampFrom: WEEK_AGO, timestampTo: WEEK_AGO + 300 },
      context: { clientName: 'block' },
      onCompleted: (data) => {
        setBlockWeeklyNumber(parseInt(data.blocks[0].number));
      }
    }
  );

  /**
   * Get current pool data
   */
  const [getCurrentPoolData, { loading, error, data: currentPoolData }] = useLazyQuery<PoolData>(
    CURRENT_POOL_DATA,
    {
      variables: { poolIds },
      context: { clientName: 'uniswap' }
    }
  );

  /**
   * Get pool data from 24 hours ago
   */
  const [
    getBlockDailyPoolData,
    { loading: blockDailyPoolLoading, error: blockDailyPoolError, data: blockDailyPoolData }
  ] = useLazyQuery<PoolData>(BLOCK_POOL_DATA, {
    variables: { poolIds, blockNumber: blockDailyNumber },
    context: { clientName: 'uniswap' }
  });

  /**
   * Get pool data from 1 week ago
   */
  const [
    getBlockWeeklyPoolData,
    { loading: blockWeeklyPoolLoading, error: blockWeeklyPoolError, data: blockWeeklyPoolData }
  ] = useLazyQuery<PoolData>(BLOCK_POOL_DATA, {
    variables: { poolIds, blockNumber: blockWeeklyNumber },
    context: { clientName: 'uniswap' }
  });

  /**
   * Get current, past 24 hour, and past week pool data once pool ids and block numbers
   * are obtained
   */
  useEffect(() => {
    if (poolIds.length > 0 && blockDailyNumber && blockWeeklyNumber) {
      getCurrentPoolData();
      getBlockDailyPoolData();
      getBlockWeeklyPoolData();
    }
  }, [
    poolIdLoading,
    blockDailyNumberLoading,
    blockWeeklyNumberLoading,
    poolIdError,
    blockDailyNumberError,
    blockWeeklyNumberError,
    poolIds,
    blockDailyNumber,
    blockWeeklyNumber
  ]);

  /**
   * Use current and past pool data to create a formatted pool data
   */
  useEffect(() => {
    if (
      !loading &&
      !blockDailyPoolLoading &&
      !blockWeeklyPoolLoading &&
      !error &&
      !blockDailyPoolError &&
      !blockWeeklyPoolError &&
      currentPoolData &&
      blockDailyPoolData &&
      blockWeeklyPoolData
    ) {
      const poolMap = new Map();
      currentPoolData.pools.forEach((p) => {
        poolMap.set(p.id, {
          token0: p.token0.symbol,
          token1: p.token1.symbol,
          feeTier: parseInt(p.feeTier) / 10000 ?? 0,
          tvl: parseFloat(p.totalValueLockedUSD),
          volume: parseFloat(p.volumeUSD)
        });
      });

      blockDailyPoolData.pools.forEach((p) => {
        const pool = poolMap.get(p.id);
        const oldVolume = parseFloat(p.volumeUSD);
        const volumeDailyChange = oldVolume ? pool.volume - oldVolume : 0;
        poolMap.set(p.id, { ...pool, volumeDailyChange });
      });

      blockWeeklyPoolData.pools.forEach((p) => {
        const pool = poolMap.get(p.id);
        const oldVolume = parseFloat(p.volumeUSD);
        const volumeWeeklyChange = oldVolume ? pool.volume - oldVolume : 0;
        poolMap.set(p.id, { ...pool, volumeWeeklyChange });
      });

      setPools(Array.from(poolMap, ([key, value]) => ({ id: key, ...value })));
    }
  }, [
    loading,
    blockDailyPoolLoading,
    blockWeeklyPoolLoading,
    error,
    blockDailyPoolError,
    blockWeeklyPoolError,
    currentPoolData,
    blockDailyPoolData,
    blockWeeklyPoolData
  ]);

  /**
   * Sort pools based on given property and direction
   */
  useEffect(() => {
    sortPools(pools, sort.prop, sort.asc);
    setPools([...pools]);
  }, [sort]);

  /**
   * Handles pagination for the table
   * @param dir represents which direction was clicked
   */
  const handlePage = (dir: string) => {
    if (dir === 'left' && page > 1) {
      setPage((prev) => prev - 1);
    } else if (dir === 'right' && page < Math.ceil(pools.length / limitPerPage)) {
      setPage((prev) => prev + 1);
    }
  };

  /**
   * Handles sorting the pools based on selected property
   * @param prop represents the selected property
   */
  const handleSort = (prop: string) => {
    if (prop === sort.prop) setSort({ prop, asc: !sort.asc });
    else setSort({ prop, asc: false });
  };

  /**
   * Handles re-freshes
   */
  const handleRefresh = () => {
    getCurrentPoolData();
    getBlockDailyPoolData();
    getBlockWeeklyPoolData();
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="table_header">
        Top Pools <ArrowPathIcon className="refresh" onClick={() => handleRefresh()} />
      </h1>
      <div className="table_list">
        <div className="pool_grid">
          <span className="md_show left_align text-zinc-300">#</span>
          <span className="left_align text-zinc-300">Pool</span>
          <TableColHeader
            title="TVL"
            prop="tvl"
            sort={sort}
            handleSort={() => handleSort('tvl')}
            classNames=""
          />
          <TableColHeader
            title="Volume (1D)"
            prop="volumeDailyChange"
            sort={sort}
            handleSort={() => handleSort('volumeDailyChange')}
            classNames="md_show_flex"
          />
          <TableColHeader
            title="Volume (1W)"
            prop="volumeWeeklyChange"
            sort={sort}
            handleSort={() => handleSort('volumeWeeklyChange')}
            classNames="lg_show_flex"
          />
        </div>

        {/* Loading States */}
        {(poolIdLoading ||
          blockDailyNumberLoading ||
          blockWeeklyNumberLoading ||
          loading ||
          blockDailyPoolLoading ||
          blockWeeklyPoolLoading) && (
          <>
            <LoadingList limitPerPage={limitPerPage} type="pool" />
            <LoadingPagination />
          </>
        )}

        {/* Error State */}
        {(poolIdError ||
          blockDailyNumberError ||
          blockWeeklyNumberError ||
          error ||
          blockDailyPoolError ||
          blockWeeklyPoolError) && <ErrorList />}

        {!poolIdLoading &&
          !blockDailyNumberLoading &&
          !blockWeeklyNumberLoading &&
          !loading &&
          !blockDailyPoolLoading &&
          !blockWeeklyPoolLoading &&
          !poolIdError &&
          !blockDailyNumberError &&
          !blockWeeklyNumberError &&
          !error &&
          !blockDailyPoolError &&
          !blockWeeklyPoolError && (
            <>
              {pools.slice((page - 1) * limitPerPage, page * limitPerPage).map((p, i) => (
                <PoolRow key={p.id} pool={p} index={(page - 1) * limitPerPage + i + 1} />
              ))}

              <div className="table_pagination">
                <ArrowLeftIcon
                  className={page === 1 ? 'disabled_arrow' : 'arrow'}
                  onClick={() => handlePage('left')}
                />
                {`Page ${page} of ${Math.ceil(pools.length / limitPerPage)}`}
                <ArrowRightIcon
                  className={
                    page === Math.ceil(pools.length / limitPerPage) ? 'disabled_arrow' : 'arrow'
                  }
                  onClick={() => handlePage('right')}
                />
              </div>
            </>
          )}
      </div>
    </section>
  );
};

export default PoolTable;
