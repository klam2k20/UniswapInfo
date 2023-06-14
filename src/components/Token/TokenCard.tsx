import { FormatTokenDay } from '../../utils/types';
import { formatPrice } from '../../utils/utils';

interface ITokenCardProps {
  data: FormatTokenDay | undefined;
}

export const TokenCard = ({ data }: ITokenCardProps) => {
  return (
    <article className="card">
      {data ? (
        <>
          <div className="flex flex-col items-end lg:items-start">
            <span className="text-md font-light">TVL</span>
            <span className="text-xl ">{formatPrice(data.totalValueLockedUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-md font-light">Volume (1D)</span>
            <span className="text-xl ">{formatPrice(data.volumeUSD)}</span>
          </div>
          <div className="flex flex-col items-end justify-start lg:items-start">
            <span className="text-lg font-light">Price</span>
            <span className="text-xl ">{formatPrice(data.priceUSD)}</span>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-xl">No Token Data</div>
      )}
    </article>
  );
};
