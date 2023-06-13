import { FormatToken } from '../utils/types';
import { formatPercentage, formatPrice } from '../utils/utils';

interface ITokenRowProps {
  token: FormatToken;
  index: number;
}

const TokenRow = ({ token, index }: ITokenRowProps) => {
  return (
    <div className="token_grid">
      <span className="md_show left_align">{index}</span>
      <span className="left_align md_show">
        <span>{`${token.name} `}</span>
        <span className="text-zinc-500">{`(${token.symbol})`}</span>
      </span>
      <span className="md:hidden">{token.symbol}</span>
      <span className="right_align">{formatPrice(token.priceUSD)}</span>
      <span
        className={`lg_show right_align ${
          token.priceChange < 0 ? 'text-red-500' : 'text-green-500'
        }`}>
        {formatPercentage(token.priceChange)}
      </span>
      <span className="md_show right_align">{formatPrice(token.volumeChange)}</span>
      <span className="lg_show right_align">{formatPrice(token.tvl)}</span>
    </div>
  );
};

export default TokenRow;
