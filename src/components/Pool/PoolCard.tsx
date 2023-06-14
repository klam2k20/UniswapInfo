import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormatPoolDay } from '../../utils/types';
import { formatNumber, formatPrice } from '../../utils/utils';
dayjs.extend(relativeTime);

interface IPoolCardProps {
  data: FormatPoolDay | undefined;
}

const PoolCard = ({ data }: IPoolCardProps) => {
  const volumeSince = dayjs(data?.date).fromNow(true);
  return (
    <article className="card">
      {data ? (
        <>
          <div className="flex flex-col items-end lg:items-start">
            <span className="text-md font-light">TVL</span>
            <span className="text-xl ">{formatPrice(data.tvlUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-md font-light">Volume {`(${volumeSince})`}</span>
            <span className="text-xl ">{formatPrice(data.volumeUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-md font-light">Token Ratio</span>
            <span className="text-xl">{`1 ${data.token0} = ${formatNumber(data.token1Price, 5)} ${
              data.token1
            }`}</span>
            <span className="text-xl">{`1 ${data.token1} = ${formatNumber(data.token0Price, 5)} ${
              data.token0
            }`}</span>
          </div>
        </>
      ) : (
        <h1 className="flex h-full items-center justify-center text-xl">No Pool Data</h1>
      )}
    </article>
  );
};

export default PoolCard;
