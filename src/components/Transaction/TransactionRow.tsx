import { FormatTransaction } from '../../utils/types';
import { formatAccount, formatNumber, formatPrice } from '../../utils/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ETHERSCAN = 'https://etherscan.io/tx';

interface ITransactionRowProps {
  transaction: FormatTransaction;
}

export const TransactionRow = ({ transaction }: ITransactionRowProps) => {
  const formatTransaction = () => {
    const type =
      transaction.type === 'mint' ? 'Add' : transaction.type === 'burn' ? 'Remove' : 'Swap';
    return `${type} ${transaction.token0} ${type === 'Swap' ? 'for' : 'and'} ${transaction.token1}`;
  };

  return (
    <a
      className="transaction_grid"
      href={`${ETHERSCAN}/${transaction.id}`}
      target="_blank"
      rel="noopener noreferrer">
      <span className="text-pink-600">{formatTransaction()}</span>
      <span className="md_show right_align">{formatPrice(transaction.amountUSD)}</span>
      <span className="lg_show right_align">{`${formatNumber(transaction.amount0)} ${
        transaction.token0
      }`}</span>
      <span className="lg_show right_align">{`${formatNumber(transaction.amount1)} ${
        transaction.token1
      }`}</span>
      <span className="lg_show right_align text-pink-600">{formatAccount(transaction.origin)}</span>
      <span className="right_align">{dayjs(transaction.time).fromNow()}</span>
    </a>
  );
};
