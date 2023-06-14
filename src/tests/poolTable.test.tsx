import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BLOCK, BLOCK_POOL_DATA, CURRENT_POOL_DATA, TOP_POOL_IDS } from '../apollo/queries';
import PoolTable from '../components/Pool/PoolTable';
import { formatPrice } from '../utils/utils';

const DAY_AGO = Math.floor((Date.now() - 86400000) / 1000);
const WEEK_AGO = Math.floor((Date.now() - 604800000) / 1000);

const mocks = [
  {
    request: {
      query: BLOCK,
      variables: {
        timestampFrom: DAY_AGO,
        timestampTo: DAY_AGO + 300
      }
    },
    result: {
      data: {
        blocks: [{ number: '17472066' }]
      }
    }
  },
  {
    request: {
      query: BLOCK,
      variables: {
        timestampFrom: WEEK_AGO,
        timestampTo: WEEK_AGO + 300
      }
    },
    result: {
      data: {
        blocks: [{ number: '17482066' }]
      }
    }
  },
  {
    request: {
      query: TOP_POOL_IDS
    },
    result: {
      data: {
        pools: [
          { id: '1' },
          { id: '2' },
          { id: '3' },
          { id: '4' },
          { id: '5' },
          { id: '6' },
          { id: '7' },
          { id: '8' },
          { id: '9' },
          { id: '10' }
        ]
      }
    }
  },
  {
    request: {
      query: CURRENT_POOL_DATA,
      variables: {
        poolIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      }
    },
    result: {
      data: {
        pools: [
          {
            id: '1',
            token0: { symbol: 'Token1' },
            token1: { symbol: 'Token2' },
            feeTier: '1000',
            totalValueLockedUSD: '20000',
            volumeUSD: '20000'
          },
          {
            id: '2',
            token0: { symbol: 'Token3' },
            token1: { symbol: 'Token4' },
            feeTier: '2000',
            totalValueLockedUSD: '30000',
            volumeUSD: '30000'
          },
          {
            id: '3',
            token0: { symbol: 'Token5' },
            token1: { symbol: 'Token6' },
            feeTier: '3000',
            totalValueLockedUSD: '40000',
            volumeUSD: '40000'
          },
          {
            id: '4',
            token0: { symbol: 'Token7' },
            token1: { symbol: 'Token8' },
            feeTier: '4000',
            totalValueLockedUSD: '50000',
            volumeUSD: '50000'
          },
          {
            id: '5',
            token0: { symbol: 'Token9' },
            token1: { symbol: 'Token10' },
            feeTier: '5000',
            totalValueLockedUSD: '60000',
            volumeUSD: '60000'
          },
          {
            id: '6',
            token0: { symbol: 'Token11' },
            token1: { symbol: 'Token12' },
            feeTier: '6000',
            totalValueLockedUSD: '70000',
            volumeUSD: '70000'
          },
          {
            id: '7',
            token0: { symbol: 'Token13' },
            token1: { symbol: 'Token14' },
            feeTier: '7000',
            totalValueLockedUSD: '80000',
            volumeUSD: '80000'
          },
          {
            id: '8',
            token0: { symbol: 'Token15' },
            token1: { symbol: 'Token16' },
            feeTier: '8000',
            totalValueLockedUSD: '90000',
            volumeUSD: '90000'
          },
          {
            id: '9',
            token0: { symbol: 'Token17' },
            token1: { symbol: 'Token18' },
            feeTier: '9000',
            totalValueLockedUSD: '100000',
            volumeUSD: '100000'
          },
          {
            id: '10',
            token0: { symbol: 'Token19' },
            token1: { symbol: 'Token20' },
            feeTier: '10000',
            totalValueLockedUSD: '110000',
            volumeUSD: '110000'
          }
        ]
      }
    }
  },
  {
    request: {
      query: BLOCK_POOL_DATA,
      variables: {
        poolIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        blockNumber: 17472066
      }
    },
    result: {
      data: {
        pools: [
          {
            id: '1',
            token0: { symbol: 'Token1' },
            token1: { symbol: 'Token2' },
            feeTier: '1000',
            totalValueLockedUSD: '15000',
            volumeUSD: '15000'
          },
          {
            id: '2',
            token0: { symbol: 'Token3' },
            token1: { symbol: 'Token4' },
            feeTier: '2000',
            totalValueLockedUSD: '25000',
            volumeUSD: '25000'
          },
          {
            id: '3',
            token0: { symbol: 'Token5' },
            token1: { symbol: 'Token6' },
            feeTier: '3000',
            totalValueLockedUSD: '35000',
            volumeUSD: '35000'
          },
          {
            id: '4',
            token0: { symbol: 'Token7' },
            token1: { symbol: 'Token8' },
            feeTier: '4000',
            totalValueLockedUSD: '45000',
            volumeUSD: '45000'
          },
          {
            id: '5',
            token0: { symbol: 'Token9' },
            token1: { symbol: 'Token10' },
            feeTier: '5000',
            totalValueLockedUSD: '55000',
            volumeUSD: '55000'
          },
          {
            id: '6',
            token0: { symbol: 'Token11' },
            token1: { symbol: 'Token12' },
            feeTier: '6000',
            totalValueLockedUSD: '65000',
            volumeUSD: '65000'
          },
          {
            id: '7',
            token0: { symbol: 'Token13' },
            token1: { symbol: 'Token14' },
            feeTier: '7000',
            totalValueLockedUSD: '75000',
            volumeUSD: '75000'
          },
          {
            id: '8',
            token0: { symbol: 'Token15' },
            token1: { symbol: 'Token16' },
            feeTier: '8000',
            totalValueLockedUSD: '85000',
            volumeUSD: '85000'
          },
          {
            id: '9',
            token0: { symbol: 'Token17' },
            token1: { symbol: 'Token18' },
            feeTier: '9000',
            totalValueLockedUSD: '95000',
            volumeUSD: '95000'
          },
          {
            id: '10',
            token0: { symbol: 'Token19' },
            token1: { symbol: 'Token20' },
            feeTier: '10500',
            totalValueLockedUSD: '105000',
            volumeUSD: '105000'
          }
        ]
      }
    }
  },
  {
    request: {
      query: BLOCK_POOL_DATA,
      variables: {
        poolIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        blockNumber: 17482066
      }
    },
    result: {
      data: {
        pools: [
          {
            id: '1',
            token0: { symbol: 'Token1' },
            token1: { symbol: 'Token2' },
            feeTier: '1000',
            totalValueLockedUSD: '10000',
            volumeUSD: '10000'
          },
          {
            id: '2',
            token0: { symbol: 'Token3' },
            token1: { symbol: 'Token4' },
            feeTier: '2000',
            totalValueLockedUSD: '20000',
            volumeUSD: '20000'
          },
          {
            id: '3',
            token0: { symbol: 'Token5' },
            token1: { symbol: 'Token6' },
            feeTier: '3000',
            totalValueLockedUSD: '30000',
            volumeUSD: '30000'
          },
          {
            id: '4',
            token0: { symbol: 'Token7' },
            token1: { symbol: 'Token8' },
            feeTier: '4000',
            totalValueLockedUSD: '40000',
            volumeUSD: '40000'
          },
          {
            id: '5',
            token0: { symbol: 'Token9' },
            token1: { symbol: 'Token10' },
            feeTier: '5000',
            totalValueLockedUSD: '50000',
            volumeUSD: '50000'
          },
          {
            id: '6',
            token0: { symbol: 'Token11' },
            token1: { symbol: 'Token12' },
            feeTier: '6000',
            totalValueLockedUSD: '60000',
            volumeUSD: '60000'
          },
          {
            id: '7',
            token0: { symbol: 'Token13' },
            token1: { symbol: 'Token14' },
            feeTier: '7000',
            totalValueLockedUSD: '70000',
            volumeUSD: '70000'
          },
          {
            id: '8',
            token0: { symbol: 'Token15' },
            token1: { symbol: 'Token16' },
            feeTier: '8000',
            totalValueLockedUSD: '80000',
            volumeUSD: '80000'
          },
          {
            id: '9',
            token0: { symbol: 'Token17' },
            token1: { symbol: 'Token18' },
            feeTier: '9000',
            totalValueLockedUSD: '90000',
            volumeUSD: '90000'
          },
          {
            id: '10',
            token0: { symbol: 'Token19' },
            token1: { symbol: 'Token20' },
            feeTier: '10500',
            totalValueLockedUSD: '100000',
            volumeUSD: '100000'
          }
        ]
      }
    }
  }
];

describe('PoolTable', () => {
  it('Pool table headers render correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoolTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    const title = screen.getByText('Top Pools');
    const index = screen.getByText('#');
    const pool = screen.getByText('Pool');
    const tvl = screen.getByText('TVL');
    const volume1d = screen.getByText('Volume (1D)');
    const volume1w = screen.getByText('Volume (1W)');
    expect(title).toBeInTheDocument();
    expect(index).toBeInTheDocument();
    expect(pool).toBeInTheDocument();
    expect(tvl).toBeInTheDocument();
    expect(volume1d).toBeInTheDocument();
    expect(volume1w).toBeInTheDocument();
  });

  it('Pool table rows display correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoolTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );
    for (let i = 1; i < 6; i++) {
      expect(await screen.findAllByText(`Token${2 * i - 1}/Token${2 * i}`)).toHaveLength(2);
      expect(await screen.findAllByText(formatPrice((i + 1) * 10000))).toHaveLength(1);
      expect(await screen.findAllByText(formatPrice(5000))).toHaveLength(5);
      expect(await screen.findAllByText(formatPrice(10000))).toHaveLength(5);
    }
    expect(screen.queryAllByText('Token11/Token12')).toHaveLength(0);
    expect(screen.queryAllByText('Token13/Token14')).toHaveLength(0);
    expect(screen.queryAllByText('Token15/Token16')).toHaveLength(0);
    expect(screen.queryAllByText('Token17/Token18')).toHaveLength(0);
    expect(screen.queryAllByText('Token19/Token20')).toHaveLength(0);
  });

  it('Pool table pagination works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoolTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findAllByText('Token1/Token2')).toHaveLength(2);

    fireEvent.click(screen.getByTestId('pool-right-arrow'));

    await screen.findAllByText('Token11/Token12');
    expect(screen.queryAllByText('Token1/Token2')).toHaveLength(0);
    expect(screen.getAllByText('Token11/Token12')).toHaveLength(2);
  });

  it('Pool table sort works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PoolTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    await screen.findAllByText('Token1/Token2');
    expect(screen.getAllByText('Token1/Token2')).toHaveLength(2);
    expect(screen.getByText('$20.00k')).toBeInTheDocument();

    fireEvent.click(screen.getByText('TVL'));
    fireEvent.click(screen.getByText('TVL'));

    await screen.findAllByText('Token19/Token20');
    expect(screen.getAllByText('Token19/Token20')).toHaveLength(2);
    expect(screen.getByText('$110.00k')).toBeInTheDocument();

    fireEvent.click(screen.getByText('TVL'));

    await screen.findAllByText('Token1/Token2');
    expect(screen.getAllByText('Token1/Token2')).toHaveLength(2);
    expect(screen.getByText('$20.00k')).toBeInTheDocument();
  });
});
