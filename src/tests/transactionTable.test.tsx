import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { MemoryRouter } from 'react-router-dom';
import { TRANSACTION_DATA } from '../apollo/queries';
import TransactionTable from '../components/Transaction/TransactionTable';
dayjs.extend(relativeTime);

const mocks = [
  {
    request: {
      query: TRANSACTION_DATA
    },
    result: {
      data: {
        transactions: [
          {
            id: 1,
            timestamp: '1686772151',
            mints: [],
            burns: [],
            swaps: [
              {
                origin: 'acc123456cca',
                token0: { symbol: 'T1' },
                token1: { symbol: 'T2' },
                amount0: '1',
                amount1: '2',
                amountUSD: '100'
              }
            ]
          },
          {
            id: 2,
            timestamp: '1686685751',
            mints: [],
            burns: [
              {
                origin: 'acc234567cca',
                token0: { symbol: 'T3' },
                token1: { symbol: 'T4' },
                amount0: '3',
                amount1: '4',
                amountUSD: '200'
              }
            ],
            swaps: []
          }
        ]
      }
    }
  }
];

describe('TransactionTable', () => {
  it('Transaction table headers render correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TransactionTable limitPerPage={1} />
        </MockedProvider>
      </MemoryRouter>
    );

    const transaction = screen.getByText('Transaction');
    const totalValue = screen.getByText('Total Value');
    const tokenAmount = screen.getAllByText('Token Amount');
    const account = screen.getByText('Account');
    const time = screen.getByText('Time');
    expect(transaction).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
    expect(tokenAmount).toHaveLength(2);
    expect(account).toBeInTheDocument();
    expect(time).toBeInTheDocument();
  });

  it('Transaction table rows display correctly', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TransactionTable limitPerPage={1} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Swap T1 for T2')).toBeInTheDocument();
    expect(await screen.findByText('$100.00')).toBeInTheDocument();
    expect(await screen.findByText('1.00 T1')).toBeInTheDocument();
    expect(await screen.findByText('2.00 T2')).toBeInTheDocument();
    expect(await screen.findByText('acc123...6cca')).toBeInTheDocument();
    expect(await screen.findByText(dayjs(1686772151000).fromNow())).toBeInTheDocument();
    expect(screen.queryByText('Remove T3 and T4')).toBeNull();
  });

  it('Transaction table pagination works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TransactionTable limitPerPage={1} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Swap T1 for T2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('transaction-right-arrow'));

    await screen.findByText('Remove T3 and T4');
    expect(screen.queryByText('Swap T1 for T2')).not.toBeInTheDocument();
    expect(screen.getByText('Remove T3 and T4')).toBeInTheDocument();
  });

  it('Transaction table sort works', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <TransactionTable limitPerPage={1} />
        </MockedProvider>
      </MemoryRouter>
    );

    await screen.findByText('Swap T1 for T2');
    expect(screen.getByText('Swap T1 for T2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Time'));

    await screen.findByText('Remove T3 and T4');
    expect(screen.getByText('Remove T3 and T4')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Time'));

    await screen.findByText('Swap T1 for T2');
    expect(screen.getByText('Swap T1 for T2')).toBeInTheDocument();
  });
});
