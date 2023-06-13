import { FormatPool, FormatToken, FormatTransaction } from './types';

export function formatNumber(number: number) {
  if (number >= 1000 && number < 1000000) {
    return `${(number / 1000).toFixed(2)}k`;
  } else if (number >= 1000000 && number < 1000000000) {
    return `${(number / 1000000).toFixed(2)}M`;
  } else if (number >= 1000000000 && number < 1000000000000) {
    return `${(number / 1000000000).toFixed(2)}B`;
  } else if (number >= 1000000000000) {
    return `${(number / 1000000000000).toFixed(2)}T`;
  } else {
    return `${number.toFixed(2)}`;
  }
}

export function formatPrice(price: number) {
  if (price < 0.01) {
    return '<$0.01';
  } else {
    return `$${formatNumber(price)}`;
  }
}

export function formatPercentage(percent: number) {
  return `${Math.abs(percent).toFixed(2)}%`;
}

export function formatAccount(account: string) {
  if (account.length < 10) {
    return account;
  }

  const prefix = account.substring(0, 6);
  const suffix = account.substring(account.length - 4);

  return `${prefix}...${suffix}`;
}

export function sortTokens(tokens: FormatToken[], prop: string, asc: boolean) {
  switch (prop) {
    case 'price':
      asc
        ? tokens.sort((a, b) => a.priceUSD - b.priceUSD)
        : tokens.sort((a, b) => b.priceUSD - a.priceUSD);
      break;
    case 'priceChange':
      asc
        ? tokens.sort((a, b) => a.priceChange - b.priceChange)
        : tokens.sort((a, b) => b.priceChange - a.priceChange);
      break;
    case 'volumeDailyChange':
      asc
        ? tokens.sort((a, b) => a.volumeChange - b.volumeChange)
        : tokens.sort((a, b) => b.volumeChange - a.volumeChange);
      break;
    default:
      asc ? tokens.sort((a, b) => a.tvl - b.tvl) : tokens.sort((a, b) => b.tvl - a.tvl);
      break;
  }
}

export function sortPools(pools: FormatPool[], prop: string, asc: boolean) {
  switch (prop) {
    case 'volumeDailyChange':
      asc
        ? pools.sort((a, b) => a.volumeDailyChange - b.volumeDailyChange)
        : pools.sort((a, b) => b.volumeDailyChange - a.volumeDailyChange);
      break;
    case 'volumeWeeklyChange':
      asc
        ? pools.sort((a, b) => a.volumeWeeklyChange - b.volumeWeeklyChange)
        : pools.sort((a, b) => b.volumeWeeklyChange - a.volumeWeeklyChange);
      break;
    default:
      asc ? pools.sort((a, b) => a.tvl - b.tvl) : pools.sort((a, b) => b.tvl - a.tvl);
      break;
  }
}

export function sortTransactions(tx: FormatTransaction[], prop: string, asc: boolean) {
  switch (prop) {
    case 'amountUSD':
      asc
        ? tx.sort((a, b) => a.amountUSD - b.amountUSD)
        : tx.sort((a, b) => b.amountUSD - a.amountUSD);
      break;
    case 'amount0':
      asc ? tx.sort((a, b) => a.amount0 - b.amount0) : tx.sort((a, b) => b.amount0 - a.amount0);
      break;
    case 'amount1':
      asc ? tx.sort((a, b) => a.amount1 - b.amount1) : tx.sort((a, b) => b.amount1 - a.amount1);
      break;
    case 'origin':
      asc
        ? tx.sort((a, b) => parseInt(a.origin, 16) - parseInt(b.origin, 16))
        : tx.sort((a, b) => parseInt(b.origin, 16) - parseInt(a.origin, 16));
      break;
    default:
      asc ? tx.sort((a, b) => a.time - b.time) : tx.sort((a, b) => b.time - a.time);
      break;
  }
}
