import { Market } from './Market';

export interface MarketProvider {
  getMarket(marketId: string): Promise<Market>;
}
