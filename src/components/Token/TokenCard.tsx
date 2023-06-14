import { FormatTokenDay } from '../../utils/types';
import { formatPrice } from '../../utils/utils';

interface ITokenCardProps {
  data: FormatTokenDay;
}

export const TokenCard = ({ data }: ITokenCardProps) => {
  return (
    <article className="card">
      <div className="flex flex-col items-start justify-start">
        <span className="text-md font-light">TVL</span>
        <span className="text-xl ">{formatPrice(data.totalValueLockedUSD)}</span>
      </div>
      <div className="flex flex-col items-start justify-start">
        <span className="text-md font-light">Volume (1D)</span>
        <span className="text-xl ">{formatPrice(data.volumeUSD)}</span>
      </div>
      <div className="flex flex-col items-start justify-start">
        <span className="text-lg font-light">Price</span>
        <span className="text-xl ">{formatPrice(data.priceUSD)}</span>
      </div>
    </article>
  );
};
