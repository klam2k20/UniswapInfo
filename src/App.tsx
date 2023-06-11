import { Outlet, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TokensPage from './pages/TokensPage';
import PoolsPage from './pages/PoolsPage';
import TransactionsPage from './pages/TransactionsPage';
import NavHeader from './components/NavHeader';

function App() {
  /**
   * Header - Overview Tokens Pools Transactions Link
   * Token, Pool, Transaction Context
   * Token Table, Pool Table, Transaction Table, Graphs, Stats Card Components
   * Router on index: Overview, Tokens, Pools, Transactions, Token ID, Pool ID
   *  - Root Layout: With Header on Top and Outlet
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
          <Route path="/pools" element={<PoolsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  return (
    <div className="flex justify-center items-center">
      <NavHeader />
      <main className="mt-16 pt-8 max-w-[1200px] w-[90%] h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
