import { PoolTable } from '../components/Pool/PoolTable';
import { TokenTable } from '../components/Token/TokenTable';

const HomePage = () => {
  return (
    <>
      <TokenTable limitPerPage={10} />
      <PoolTable limitPerPage={10} />
    </>
  );
};

export default HomePage;
