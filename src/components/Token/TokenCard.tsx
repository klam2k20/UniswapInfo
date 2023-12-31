import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormatTokenDay } from '../../utils/types';
import { formatPrice } from '../../utils/utils';
dayjs.extend(relativeTime);

interface ITokenCardProps {
  data: FormatTokenDay | undefined;
}

const TokenCard = ({ data }: ITokenCardProps) => {
  const volumeSince = dayjs(data?.date).fromNow(true);
  return (
    <article className="card">
      {data ? (
        <>
          <div className="flex flex-col items-end lg:items-start">
            <span className="text-md font-light">TVL</span>
            <span className="text-xl ">{formatPrice(data.totalValueLockedUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-md font-light">Volume {`(${volumeSince})`}</span>
            <span className="text-xl ">{formatPrice(data.volumeUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-lg font-light">Price</span>
            <span className="text-xl ">{formatPrice(data.priceUSD)}</span>
          </div>
        </>
      ) : (
        <h1 className="flex h-full items-center justify-center text-xl">No Token Data</h1>
      )}
    </article>
  );
};

export default TokenCard;
