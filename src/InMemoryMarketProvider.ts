import { Market } from './Market';
import { MarketProvider } from './MarketProvider';

export class InMemoryMarketProvider implements MarketProvider {
  async getMarket(marketId: string): Promise<Market> {
    return {
      id: '1',
      currency: 'PLN',
      vat: 0.23,
    };
  }
}
