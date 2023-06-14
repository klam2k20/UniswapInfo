import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { POOL_DAY_DATA } from '../apollo/queries';
import { AreaChartWrapper, TwoLineChartWrapper } from '../components/Charts/LineChart';
import { ErrorCard, ErrorChart } from '../components/ErrorStates';
import { LoadingCard, LoadingChart } from '../components/LoadingStates';
import PoolCard from '../components/Pool/PoolCard';
import { ChartPoint, FormatPoolDay, PoolDayData, TwoLineChartPoint } from '../utils/types';

const YEAR_AGO = dayjs().subtract(1, 'y').unix();

const PoolPage = () => {
  const location = useLocation();
  const { id, token0, token1 } = location.state;
  const [current, setCurrent] = useState<FormatPoolDay>();
  const [volumeData, setVolumeData] = useState<ChartPoint[]>([]);
  const [tvlData, setTvlData] = useState<ChartPoint[]>([]);
  const [tokenRatioData, setTokenRatioData] = useState<TwoLineChartPoint[]>([]);
  const [selectedChart, setSelectedChart] = useState('');
  const [chartData, setChartData] = useState<ChartPoint[] | TwoLineChartPoint[]>();

  const { loading, error, data } = useQuery<PoolDayData>(POOL_DAY_DATA, {
    variables: { poolId: id, timestamp: YEAR_AGO },
    context: { clientName: 'uniswap' }
  });

  /**
   * Organize pool day data into TVL, volume and token ratio charts
   */
  useEffect(() => {
    if (!loading && !error && data) {
      let current;
      if (data.poolDayDatas.length > 0) {
        const lastInx = data.poolDayDatas.length - 1;
        current = {
          date: parseInt(data.poolDayDatas[lastInx].date) * 1000,
          token0,
          token1,
          token0Price: parseFloat(data.poolDayDatas[lastInx].token0Price),
          token1Price: parseFloat(data.poolDayDatas[lastInx].token1Price),
          tvlUSD: parseFloat(data.poolDayDatas[lastInx].tvlUSD),
          volumeUSD: parseFloat(data.poolDayDatas[lastInx].volumeUSD)
        };
      }
      const volume = data.poolDayDatas.map((p) => ({
        date: parseInt(p.date) * 1000,
        value: parseFloat(p.volumeUSD)
      }));
      const tvl = data.poolDayDatas.map((p) => ({
        date: parseInt(p.date) * 1000,
        value: parseFloat(p.tvlUSD)
      }));
      const tokenRatio = data.poolDayDatas.map((p) => ({
        date: parseInt(p.date) * 1000,
        name1: token0,
        line1: parseFloat(p.token0Price),
        name2: token1,
        line2: parseFloat(p.token1Price)
      }));
      setVolumeData(volume);
      setTvlData(tvl);
      setTokenRatioData(tokenRatio);
      setCurrent(current);
      setSelectedChart('tvl');
      setChartData(tvlData);
    }
  }, [loading, error, data]);

  useEffect(() => {
    selectedChart === 'tvl'
      ? setChartData(tvlData)
      : selectedChart === 'volume'
      ? setChartData(volumeData)
      : setChartData(tokenRatioData);
  }, [selectedChart]);

  const handleSelectChart = (type: string) => {
    setSelectedChart(type);
  };

  return (
    <>
      <div className="flex items-center justify-start gap-1">
        <Link to="/" className="opacity_75 text-lg text-zinc-400">
          Home {'>'}
        </Link>
        <Link to="/pools" className="opacity_75 text-lg text-zinc-400">
          Pools {'>'}
        </Link>
        <span className="text-lg">{`${token0}/${token1}`}</span>
      </div>
      <section className="flex flex-col gap-4 lg:flex-row">
        {/* Loading State */}
        {loading && (
          <>
            <LoadingCard />
            <LoadingChart />
          </>
        )}

        {/* Error State */}
        {error && (
          <>
            <ErrorCard />
            <ErrorChart />
          </>
        )}

        {!loading && !error && chartData && (
          <>
            <PoolCard data={current} />
            <article className="chart_wrapper relative overflow-hidden">
              <div className="absolute right-4 top-4 z-10 flex gap-2">
                <span
                  className={`opacity_75 cursor-pointer ${
                    selectedChart === 'tvl' ? 'underline_offset' : ''
                  }`}
                  onClick={() => handleSelectChart('tvl')}>
                  TVL
                </span>
                <span
                  className={`opacity_75 cursor-pointer ${
                    selectedChart === 'volume' ? 'underline_offset' : ''
                  }`}
                  onClick={() => handleSelectChart('volume')}>
                  Volume
                </span>
                <span
                  className={`opacity_75 cursor-pointer ${
                    selectedChart === 'tokenRatio' ? 'underline_offset' : ''
                  }`}
                  onClick={() => handleSelectChart('tokenRatio')}>
                  Token Ratio
                </span>
              </div>
              {selectedChart === 'tokenRatio' ? (
                <TwoLineChartWrapper data={chartData as TwoLineChartPoint[]} />
              ) : (
                <AreaChartWrapper data={chartData as ChartPoint[]} />
              )}
            </article>
          </>
        )}
      </section>
    </>
  );
};

export default PoolPage;
