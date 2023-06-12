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
