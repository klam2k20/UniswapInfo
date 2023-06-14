import { Outlet, Route, Routes } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import HomePage from './pages/HomePage';
import PoolPage from './pages/PoolPage';
import PoolsPage from './pages/PoolsPage';
import TokenPage from './pages/TokenPage';
import TokensPage from './pages/TokensPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  /**
   * Token Table, Pool Table, Transaction Table, Graphs, Stats Card Components
   * Router on index: Token ID, Pool ID
   * Overall, Token, Pool, Transaction, Token ID, Pool ID Page
   *  - Overall Page: Token, Pool, Transaction Table
   *  - Token: Token Table
   *    - Token ID: Stats Card, Graphs, Pool Table, Transaction Table
   *  - Pool: Pool Table
   *    - Pool ID: Stats Card, Graphs, Transaction Table
   *  - Transaction: Transaction Table
   */
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/tokens" element={<TokensPage />} />
          <Route path="/token/:tokenId" element={<TokenPage />} />
          <Route path="/pools" element={<PoolsPage />} />
          <Route path="/pool/:poolId" element={<PoolPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div className="app">
      <NavHeader />
      <main className="main_wrapper">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
