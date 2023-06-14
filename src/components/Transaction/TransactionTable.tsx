import { useLazyQuery } from '@apollo/client';
import { ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { TRANSACTION_DATA } from '../../apollo/queries';
import { FormatTransaction, SortType, TransactionData } from '../../utils/types';
import { sortTransactions } from '../../utils/utils';
import { ErrorList } from '../ErrorStates';
import { LoadingList, LoadingPagination } from '../LoadingStates';
import TableColHeader from '../TableColHeader';
import { TransactionRow } from './TransactionRow';

interface ITransactionTableProps {
  limitPerPage: number;
}

const TransactionTable = ({ limitPerPage }: ITransactionTableProps) => {
  const [transactions, setTransactions] = useState<FormatTransaction[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<SortType>({ prop: 'time', asc: false });

  /**
   * Get transaction data
   */
  const [getTransactionData, { loading, error, data }] = useLazyQuery<TransactionData>(
    TRANSACTION_DATA,
    {
      context: { clientName: 'uniswap' }
    }
  );

  useEffect(() => {
    getTransactionData();
  }, []);

  /**
   * Format transaction data
   */
  useEffect(() => {
    if (!loading && !error && data) {
      const trx = data.transactions.filter(
        (t) => t.mints.length > 0 || t.burns.length > 0 || t.swaps.length > 0
      );
      const formattedTransactions = trx.map((tx) => {
        if (tx.mints.length > 0) {
          return {
            id: tx.id,
            type: 'mint',
            token0: tx.mints[0].token0.symbol,
            token1: tx.mints[0].token1.symbol,
            amount0: Math.abs(parseFloat(tx.mints[0].amount0)),
            amount1: Math.abs(parseFloat(tx.mints[0].amount1)),
            amountUSD: parseFloat(tx.mints[0].amountUSD),
            origin: tx.mints[0].origin,
            time: parseInt(tx.timestamp) * 1000
          };
        } else if (tx.burns.length > 0) {
          return {
            id: tx.id,
            type: 'burn',
            token0: tx.burns[0].token0.symbol,
            token1: tx.burns[0].token1.symbol,
            amount0: Math.abs(parseFloat(tx.burns[0].amount0)),
            amount1: Math.abs(parseFloat(tx.burns[0].amount1)),
            amountUSD: parseFloat(tx.burns[0].amountUSD),
            origin: tx.burns[0].origin,
            time: parseInt(tx.timestamp) * 1000
          };
        } else {
          return {
            id: tx.id,
            type: 'swap',
            token0: tx.swaps[0].token0.symbol,
            token1: tx.swaps[0].token1.symbol,
            amount0: Math.abs(parseFloat(tx.swaps[0].amount0)),
            amount1: Math.abs(parseFloat(tx.swaps[0].amount1)),
            amountUSD: parseFloat(tx.swaps[0].amountUSD),
            origin: tx.swaps[0].origin,
            time: parseInt(tx.timestamp) * 1000
          };
        }
      });
      setTransactions([...formattedTransactions]);
    }
  }, [loading, error, data]);

  /**
   * Sort tokens based on given property and direction
   */
  useEffect(() => {
    sortTransactions(transactions, sort.prop, sort.asc);
    setTransactions([...transactions]);
  }, [sort]);

  /**
   * Handles pagination for the table
   * @param dir represents which direction was clicked
   */
  const handlePage = (dir: string) => {
    if (dir === 'left' && page > 1) {
      setPage((prev) => prev - 1);
    } else if (dir === 'right' && page < Math.ceil(transactions.length / limitPerPage)) {
      setPage((prev) => prev + 1);
    }
  };

  /**
   * Handles sorting the tokens based on selected property
   * @param prop represents the selected property
   */
  const handleSort = (prop: string) => {
    if (prop === sort.prop) setSort({ prop, asc: !sort.asc });
    else setSort({ prop, asc: false });
  };

  /**
   * Handles re-freshes
   */
  const handleRefresh = () => {
    getTransactionData();
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="table_header">
        Recent Transactions <ArrowPathIcon className="refresh" onClick={() => handleRefresh()} />
      </h1>
      <div className="table_list">
        <div className="transaction_grid">
          <span className="left_align text-zinc-300">Transaction</span>
          <TableColHeader
            title="Total Value"
            prop="amountUSD"
            sort={sort}
            handleSort={() => handleSort('amountUSD')}
            classNames="md_show_flex"
          />
          <TableColHeader
            title="Token Amount"
            prop="amount0"
            sort={sort}
            handleSort={() => handleSort('amount0')}
            classNames="lg_show_flex"
          />
          <TableColHeader
            title="Token Amount"
            prop="amount1"
            sort={sort}
            handleSort={() => handleSort('amount1')}
            classNames="lg_show_flex"
          />
          <TableColHeader
            title="Account"
            prop="origin"
            sort={sort}
            handleSort={() => handleSort('origin')}
            classNames="lg_show_flex"
          />
          <TableColHeader
            title="Time"
            prop="time"
            sort={sort}
            handleSort={() => handleSort('time')}
            classNames=""
          />
        </div>

        {/* Loading States */}
        {loading && (
          <>
            <LoadingList limitPerPage={limitPerPage} type="transaction" />
            <LoadingPagination />
          </>
        )}

        {/* Error State */}
        {error && <ErrorList />}

        {!loading && !error && (
          <>
            {transactions.slice((page - 1) * limitPerPage, page * limitPerPage).map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}

            <div className="table_pagination">
              <ArrowLeftIcon
                className={page === 1 ? 'disabled_arrow' : 'arrow'}
                onClick={() => handlePage('left')}
              />
              {`Page ${page} of ${Math.ceil(transactions.length / limitPerPage)}`}
              <ArrowRightIcon
                className={
                  page === Math.ceil(transactions.length / limitPerPage)
                    ? 'disabled_arrow'
                    : 'arrow'
                }
                onClick={() => handlePage('right')}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TransactionTable;
