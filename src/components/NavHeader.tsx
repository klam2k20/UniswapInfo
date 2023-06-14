import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

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
    return `nav_link ${selected === link ? 'active_nav_link' : ''}`;
  };

  return (
    <header>
      <Link to="/">
        <FaceSmileIcon className="logo" />
      </Link>

      <div className="flex items-center justify-center transition-all sm:gap-1">
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
