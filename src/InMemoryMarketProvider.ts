import { Market } from './Market';
import { MarketProvider } from './MarketProvider';
import { Vat } from './Vat';

// TODO: implement real logic, add specs
export class InMemoryMarketProvider implements MarketProvider {
  async getMarket(marketId: string): Promise<Market> {
    return {
      id: '1',
      currency: 'PLN',
      vat: Vat.of(0.23),
    };
  }
}
