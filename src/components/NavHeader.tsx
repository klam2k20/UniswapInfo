import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavHeader = () => {
  const [selected, setSelected] = useState<string>('overview');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/tokens')) setSelected('tokens');
    else if (path.startsWith('/pools')) setSelected('pools');
    else if (path.startsWith('/transactions')) setSelected('transactions');
    else setSelected('overview');
  }, [location]);

  const formatLinkClassNames = (link: string) => {
    return `navLink ${selected === link ? 'activeNavLink' : ''}`;
  };

  return (
    <header>
      <Link to="/">
        <img className="logo" src="uniswap_logo.svg" alt="Uniswap Logo" />
      </Link>

      <div className="flex gap-1 justify-center items-center">
        <Link className={formatLinkClassNames('overview')} to="/">
          Overview
        </Link>
        <Link className={formatLinkClassNames('tokens')} to="/tokens">
          Tokens
        </Link>
        <Link className={formatLinkClassNames('pools')} to="/pools">
          Pools
        </Link>
        <Link className={formatLinkClassNames('transactions')} to="/transactions">
          Transactions
        </Link>
      </div>
    </header>
  );
};

export default NavHeader;