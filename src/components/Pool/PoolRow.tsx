import { FormatPool } from '../../utils/types';
import { formatPercentage, formatPrice } from '../../utils/utils';

interface IPoolRowProps {
  pool: FormatPool;
  index: number;
}

const PoolRow = ({ pool, index }: IPoolRowProps) => {
  return (
    <div className="pool_grid">
      <span className="md_show left_align">{index}</span>
      <span className="left_align md_show">
        <span>{`${pool.token0}/${pool.token1} `}</span>
        <span className="pool_feeTier">{formatPercentage(pool.feeTier)}</span>
      </span>
      <span className="md:hidden">{`${pool.token0}/${pool.token1}`}</span>
      <span className="right_align">{formatPrice(pool.tvl)}</span>
      <span className="md_show right_align">{formatPrice(pool.volumeDailyChange)}</span>
      <span className="lg_show right_align">{formatPrice(pool.volumeWeeklyChange)}</span>
    </div>
  );
};

export default PoolRow;
