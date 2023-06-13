import { TransactionTable } from '../components/Transaction/TransactionTable';

const TransactionsPage = () => {
  return <TransactionTable limitPerPage={25} />;
};

export default TransactionsPage;
