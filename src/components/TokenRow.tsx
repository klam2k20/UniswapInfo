import * as React from 'react';
import { FormatToken } from '../utils/types';

interface ITokenRowProps {
  token: FormatToken;
  index: number;
}

const TokenRow: React.FunctionComponent<ITokenRowProps> = ({ token, index }) => {
  return (
    <div className="token_grid">
      <span className="md_show left_align">{index}</span>
      <span className="left_align">
        {token.name} <span>{`(${token.symbol})`}</span>
      </span>
      <span className="left_align">{token.priceUSD}</span>
      <span className="lg_show left_align ">{token.priceChange}</span>
      <span className="md_show right_align">{token.volumeChange}</span>
      <span className="lg_show right_align">{token.tvl}</span>
    </div>
  );
};

export default TokenRow;
