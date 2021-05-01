import { MarketProvider } from './MarketProvider';

export class PriceProvider {
  constructor(private readonly marketProvider: MarketProvider) {}
  async calculateGrossPrice(netPrice: number, marketId: string) {
    const market = await this.marketProvider.getMarket(marketId);
    const { vat } = market;

    if (vat >= 1.0) {
      throw new Error('Invalid VAT value');
    }

    const grossPrice = netPrice * (1 + vat);

    return parseFloat(grossPrice.toFixed(2));
  }
}
