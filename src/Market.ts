import { Vat } from './Vat';

export interface Market {
  id: string;
  currency: string;
  vat: Vat;
}
