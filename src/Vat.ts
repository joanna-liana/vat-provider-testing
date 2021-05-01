export class Vat {
  private constructor(private readonly _value: number) {}

  static of(value: number): Vat {
    if (value < 0 || value >= 1) {
      throw new Error('Invalid VAT value');
    }

    return new Vat(value);
  }

  // TODO: expect a valid, non-negative price
  applyTo(price: number) {
    const priceWithVat = price * (1 + this._value);

    return parseFloat(priceWithVat.toFixed(2));
  }
}
