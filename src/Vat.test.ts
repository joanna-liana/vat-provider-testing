import { Vat } from './Vat';

describe('Vat', () => {
  describe('Create', () => {
    it.each([0, 0.1, 0.23, 0.99])(
      'can be created from a valid number - %f',
      (value) => {
        expect(Vat.of(value)).toBeInstanceOf(Vat);
      }
    );

    it.each([1, 1.0, 1.1, 2])(
      'throws if the VAT value is equal to or higher than 1.0 - vat %f',
      async (vat) => {
        expect(() => Vat.of(vat)).toThrowError();
      }
    );

    it.each([-1, -0.1, -0.5])(
      'throws if the VAT value is below 0 - vat %f',
      async (vat) => {
        expect(() => Vat.of(vat)).toThrowError();
      }
    );
  });

  describe('Apply to price', () => {
    const vatWithPrice = [
      [0, 1, 1],
      [0.23, 1, 1.23],
      [0.99, 1, 1.99],

      [0, 100, 100],
      [0.23, 100, 123],
      [0.99, 100, 199],

      [0, 1350.78, 1350.78],
      [0.23, 1350.78, 1661.46],
      [0.99, 1350.78, 2688.05],
    ];

    it.each(vatWithPrice)(
      'returns the price with the VAT value added - vat %f, price %s',
      (vat, price, expectedPrice) => {
        expect(Vat.of(vat).applyTo(price)).toBe(expectedPrice);
      }
    );
  });
});
