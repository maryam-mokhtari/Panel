export const extractTaxObjectFromInvoicePrices = prices => {
  return prices.filter(price => {
    return price.priceComponent && price.priceComponent.priceType.toLowerCase() === 'surcharge'
  })[0] || { price: 0 }
}

export const extractPriceObjectFromInvoicePrices = prices => {
  return prices.filter(price => {
    return price.priceComponent && price.priceComponent.priceType.toLowerCase() === 'base'
  })[0] || { price: 0 }
}

export const extractDiscountObjectFromInvoicePrices = prices => {
  return prices.filter(price => {
    return price.priceComponent && price.priceComponent.priceType.toLowerCase() === 'discount'
  })[0] || { price: 0 }
}

export function poogieToRials(poogie) {
  return poogie * 10000
}
