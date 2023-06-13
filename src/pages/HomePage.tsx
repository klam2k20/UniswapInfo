import { PoolTable } from '../components/Pool/PoolTable';
import { TokenTable } from '../components/Token/TokenTable';
import { TransactionTable } from '../components/Transaction/TransactionTable';

const HomePage = () => {
  return (
    <>
      <TokenTable limitPerPage={10} />
      <PoolTable limitPerPage={10} />
      <TransactionTable limitPerPage={10} />
    </>
  );
};

export default HomePage;
