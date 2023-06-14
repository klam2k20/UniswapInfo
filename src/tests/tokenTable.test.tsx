import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BLOCK, BLOCK_TOKEN_DATA, CURRENT_TOKEN_DATA, TOP_TOKEN_IDS } from '../apollo/queries';
import TokenTable from '../components/Token/TokenTable';
import { formatPercentage } from '../utils/utils';

const DAY_AGO = Math.floor((Date.now() - 86400000) / 1000);

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
      query: TOP_TOKEN_IDS
    },
    result: {
      data: {
        tokens: [
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
      query: CURRENT_TOKEN_DATA,
      variables: {
        tokenIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      }
    },
    result: {
      data: {
        tokens: [
          {
            id: '1',
            name: 'Token1',
            symbol: 'T1',
            totalValueLockedUSD: '100',
            volumeUSD: '100',
            tokenDayData: [{ priceUSD: '1' }]
          },
          {
            id: '2',
            name: 'Token2',
            symbol: 'T2',
            totalValueLockedUSD: '200',
            volumeUSD: '200',
            tokenDayData: [{ priceUSD: '2' }]
          },
          {
            id: '3',
            name: 'Token3',
            symbol: 'T3',
            totalValueLockedUSD: '300',
            volumeUSD: '300',
            tokenDayData: [{ priceUSD: '3' }]
          },
          {
            id: '4',
            name: 'Token4',
            symbol: 'T4',
            totalValueLockedUSD: '400',
            volumeUSD: '400',
            tokenDayData: [{ priceUSD: '4' }]
          },
          {
            id: '5',
            name: 'Token5',
            symbol: 'T5',
            totalValueLockedUSD: '500',
            volumeUSD: '500',
            tokenDayData: [{ priceUSD: '5' }]
          },
          {
            id: '6',
            name: 'Token6',
            symbol: 'T6',
            totalValueLockedUSD: '600',
            volumeUSD: '600',
            tokenDayData: [{ priceUSD: '6' }]
          },
          {
            id: '7',
            name: 'Token7',
            symbol: 'T7',
            totalValueLockedUSD: '700',
            volumeUSD: '700',
            tokenDayData: [{ priceUSD: '7' }]
          },
          {
            id: '8',
            name: 'Token8',
            symbol: 'T8',
            totalValueLockedUSD: '800',
            volumeUSD: '800',
            tokenDayData: [{ priceUSD: '8' }]
          },
          {
            id: '9',
            name: 'Token9',
            symbol: 'T9',
            totalValueLockedUSD: '900',
            volumeUSD: '900',
            tokenDayData: [{ priceUSD: '9' }]
          },
          {
            id: '10',
            name: 'Token10',
            symbol: 'T10',
            totalValueLockedUSD: '1000',
            volumeUSD: '1000',
            tokenDayData: [{ priceUSD: '10' }]
          }
        ]
      }
    }
  },
  {
    request: {
      query: BLOCK_TOKEN_DATA,
      variables: {
        tokenIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        blockNumber: 17472066
      }
    },
    result: {
      data: {
        tokens: [
          {
            id: '1',
            name: 'Token1',
            symbol: 'T1',
            totalValueLockedUSD: '150',
            volumeUSD: '150',
            tokenDayData: [{ priceUSD: '1.5' }]
          },
          {
            id: '2',
            name: 'Token2',
            symbol: 'T2',
            totalValueLockedUSD: '250',
            volumeUSD: '250',
            tokenDayData: [{ priceUSD: '2.5' }]
          },
          {
            id: '3',
            name: 'Token3',
            symbol: 'T3',
            totalValueLockedUSD: '350',
            volumeUSD: '350',
            tokenDayData: [{ priceUSD: '3.5' }]
          },
          {
            id: '4',
            name: 'Token4',
            symbol: 'T4',
            totalValueLockedUSD: '450',
            volumeUSD: '450',
            tokenDayData: [{ priceUSD: '4.5' }]
          },
          {
            id: '5',
            name: 'Token5',
            symbol: 'T5',
            totalValueLockedUSD: '550',
            volumeUSD: '550',
            tokenDayData: [{ priceUSD: '5.5' }]
          },
          {
            id: '6',
            name: 'Token6',
            symbol: 'T6',
            totalValueLockedUSD: '650',
            volumeUSD: '650',
            tokenDayData: [{ priceUSD: '6.5' }]
          },
          {
            id: '7',
            name: 'Token7',
            symbol: 'T7',
            totalValueLockedUSD: '750',
            volumeUSD: '750',
            tokenDayData: [{ priceUSD: '7.5' }]
          },
          {
            id: '8',
            name: 'Token8',
            symbol: 'T8',
            totalValueLockedUSD: '850',
            volumeUSD: '850',
            tokenDayData: [{ priceUSD: '8.5' }]
          },
          {
            id: '9',
            name: 'Token9',
            symbol: 'T9',
            totalValueLockedUSD: '950',
            volumeUSD: '950',
            tokenDayData: [{ priceUSD: '9.5' }]
          },
          {
            id: '10',
            name: 'Token10',
            symbol: 'T10',
            totalValueLockedUSD: '1050',
            volumeUSD: '1050',
            tokenDayData: [{ priceUSD: '10.5' }]
          }
        ]
      }
    }
  }
];

describe('TokenTable', () => {
  it('Token table headers render correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TokenTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    const title = screen.getByText('Top Tokens');
    const index = screen.getByText('#');
    const name = screen.getByText('Name');
    const tvl = screen.getByText('TVL');
    const price = screen.getByText('Price');
    const priceChange = screen.getByText('Price Change');
    const volume = screen.getByText('Volume (1D)');
    expect(title).toBeInTheDocument();
    expect(index).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(tvl).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(priceChange).toBeInTheDocument();
    expect(volume).toBeInTheDocument();
  });

  it('Token table rows display correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TokenTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );
    for (let i = 1; i < 6; i++) {
      const priceChange = formatPercentage(((i - (i + 0.5)) * 100) / (i + 0.5));
      expect(await screen.findByText(`Token${i}`)).toBeInTheDocument();
      expect(await screen.findByText(`(T${i})`)).toBeInTheDocument();
      expect(await screen.findByText(`$${i * 100}.00`)).toBeInTheDocument();
      expect(await screen.findByText(priceChange)).toBeInTheDocument();
    }
    expect(screen.queryByText('Token6')).toBeNull();
    expect(screen.queryByText('Token7')).toBeNull();
    expect(screen.queryByText('Token8')).toBeNull();
    expect(screen.queryByText('Token9')).toBeNull();
    expect(screen.queryByText('Token10')).toBeNull();
  });

  it('Token table pagination works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TokenTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Token1')).toBeInTheDocument();
    expect(await screen.findByText('(T1)')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('token-right-arrow'));

    await screen.findByText('Token6');
    expect(screen.queryByText('Token1')).not.toBeInTheDocument();
    expect(screen.queryByText('(T1)')).not.toBeInTheDocument();
    expect(screen.getByText('Token6')).toBeInTheDocument();
    expect(screen.getByText('(T6)')).toBeInTheDocument();
  });

  it('Token table sort works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TokenTable limitPerPage={5} />
        </MockedProvider>
      </MemoryRouter>
    );

    await screen.findByText('Token1');
    expect(screen.getByText('Token1')).toBeInTheDocument();
    expect(screen.getByText('(T1)')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();

    fireEvent.click(screen.getByText('TVL'));
    fireEvent.click(screen.getByText('TVL'));

    await screen.findByText('Token10');
    expect(screen.getByText('Token10')).toBeInTheDocument();
    expect(screen.getByText('(T10)')).toBeInTheDocument();
    expect(screen.getByText('$1.00k')).toBeInTheDocument();

    fireEvent.click(screen.getByText('TVL'));

    await screen.findByText('Token1');
    expect(screen.getByText('Token1')).toBeInTheDocument();
    expect(screen.getByText('(T1)')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
});
