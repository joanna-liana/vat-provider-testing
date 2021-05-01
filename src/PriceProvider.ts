import { MarketProvider } from './MarketProvider';

export class PriceProvider {
  constructor(private readonly marketProvider: MarketProvider) {}
  async calculateGrossPrice(netPrice: number, marketId: string) {
    const market = await this.marketProvider.getMarket(marketId);
    const { vat } = market;

    const grossPrice = vat.applyTo(netPrice);

    return parseFloat(grossPrice.toFixed(2));
  }
}
