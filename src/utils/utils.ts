import { FormatToken } from './types';

export function formatPrice(price: number) {
  if (price < 0.01) {
    return '<$0.01';
  } else if (price >= 1000 && price < 1000000) {
    return `$${(price / 1000).toFixed(2)}k`;
  } else if (price >= 1000000 && price < 1000000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  } else if (price >= 1000000000 && price < 1000000000000) {
    return `$${(price / 1000000000).toFixed(2)}B`;
  } else if (price >= 1000000000000) {
    return `$${(price / 1000000000000).toFixed(2)}T`;
  } else {
    return `$${price.toFixed(2)}`;
  }
}

export function formatPercentage(percent: number) {
  return `${Math.abs(percent).toFixed(2)}%`;
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
    case 'volume24h':
      asc
        ? tokens.sort((a, b) => a.volumeChange - b.volumeChange)
        : tokens.sort((a, b) => b.volumeChange - a.volumeChange);
      break;
    default:
      asc ? tokens.sort((a, b) => a.tvl - b.tvl) : tokens.sort((a, b) => b.tvl - a.tvl);
      break;
  }
}
