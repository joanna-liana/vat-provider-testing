import { Market } from './Market';
import { MarketProvider } from './MarketProvider';
import { PriceProvider } from './PriceProvider';
import { Vat } from './Vat';

describe('Price provider', () => {
  const marketWithVat = (vat?: number): Market => ({
    currency: 'PLN',
    id: '1',
    vat: Vat.of(vat ?? 0.23),
  });

  const markets = [
    [0, marketWithVat(0)],
    [0.23, marketWithVat(0.23)],
    [0.99, marketWithVat(0.99)],
  ];

  const marketsWithExpectedPrice = [
    [0, 1, marketWithVat(0), 1],
    [0.23, 100, marketWithVat(0.23), 123],
    [0.99, 1350.78, marketWithVat(0.99), 2688.05],
  ];

  it.each(marketsWithExpectedPrice)(
    'calculates the correct gross price for the given market - vat %f, net price %s',
    async (_vat, netPrice, market, expectedGrossPrice) => {
      // given
      const marketProvider: MarketProvider = {
        getMarket: jest.fn().mockResolvedValue(market),
      };

      const provider = new PriceProvider(marketProvider);

      // when
      const grossPrice = await provider.calculateGrossPrice(
        netPrice as number,
        (market as Market).id
      );

      // then
      expect(grossPrice).toBe(expectedGrossPrice);
    }
  );

  it.each(markets)(
    'given a net price equal to 0, always returns 0 gross price - vat %f',
    async (_vat, market) => {
      // given
      const marketProvider: MarketProvider = {
        getMarket: jest.fn().mockResolvedValue(market),
      };

      const provider = new PriceProvider(marketProvider);

      // when
      const grossPrice = await provider.calculateGrossPrice(
        0,
        (market as Market).id
      );

      // then
      expect(grossPrice).toBe(0);
    }
  );

  it('fails to calculate the gross price when the market could not be fetched', async () => {
    // given
    const market = marketWithVat();
    const fetchError = 'Fetch error';
    const marketProvider: MarketProvider = {
      getMarket: jest.fn().mockRejectedValue(fetchError),
    };

    const provider = new PriceProvider(marketProvider);

    // when
    const call = provider.calculateGrossPrice(1, market.id);

    // then
    await expect(call).rejects.toMatch(fetchError);
  });
});
