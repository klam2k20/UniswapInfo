import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOKEN_DAY_DATA } from '../apollo/queries';
import { AreaChartWrapper, LineChartWrapper } from '../components/Charts/LineChart';
import { ChartPoint, FormatTokenDay, TokenDayData } from '../utils/types';
import { TokenCard } from '../components/Token/TokenCard';

const YEAR_AGO = dayjs().subtract(1, 'y').unix();

const TokenPage = () => {
  const location = useLocation();
  const { id, name, symbol } = location.state;
  const [current, setCurrent] = useState<FormatTokenDay>();
  const [volumeData, setVolumeData] = useState<ChartPoint[]>([]);
  const [tvlData, setTvlData] = useState<ChartPoint[]>([]);
  const [priceData, setPriceData] = useState<ChartPoint[]>([]);
  const [selectedChart, setSelectedChart] = useState('');
  const [chartData, setChartData] = useState<ChartPoint[]>();

  const { loading, error, data } = useQuery<TokenDayData>(TOKEN_DAY_DATA, {
    variables: { tokenId: id, timestamp: YEAR_AGO },
    context: { clientName: 'uniswap' }
  });

  /**
   * Organize token day data into TVL, volume and price charts
   */
  useEffect(() => {
    if (!loading && !error && data && data.tokenDayDatas.length > 0) {
      const lastInx = data.tokenDayDatas.length - 1;
      const current = {
        date: parseInt(data.tokenDayDatas[lastInx].date) * 1000,
        volumeUSD: parseFloat(data.tokenDayDatas[lastInx].volumeUSD),
        totalValueLockedUSD: parseFloat(data.tokenDayDatas[lastInx].totalValueLockedUSD),
        priceUSD: parseFloat(data.tokenDayDatas[lastInx].priceUSD)
      };
      const volume = data.tokenDayDatas.map((t) => ({
        date: parseInt(t.date) * 1000,
        value: parseFloat(t.volumeUSD)
      }));
      const tvl = data.tokenDayDatas.map((t) => ({
        date: parseInt(t.date) * 1000,
        value: parseFloat(t.totalValueLockedUSD)
      }));
      const price = data.tokenDayDatas.map((t) => ({
        date: parseInt(t.date) * 1000,
        value: parseFloat(t.priceUSD)
      }));
      setVolumeData(volume);
      setTvlData(tvl);
      setPriceData(price);
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
      : setChartData(priceData);
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
        <Link to="/tokens" className="opacity_75 text-lg text-zinc-400">
          Tokens {'>'}
        </Link>
        <span className="text-lg">{`${name} (${symbol})`}</span>
      </div>
      <section className="flex gap-4">
        {!loading && !error && current && chartData && (
          <>
            <TokenCard data={current} />
            <article className="chart_wrapper relative">
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
                    selectedChart === 'price' ? 'underline_offset' : ''
                  }`}
                  onClick={() => handleSelectChart('price')}>
                  Price
                </span>
              </div>
              {selectedChart === 'price' ? (
                <LineChartWrapper data={chartData} />
              ) : (
                <AreaChartWrapper data={chartData} />
              )}
            </article>
          </>
        )}
      </section>
    </>
  );
};

export default TokenPage;
