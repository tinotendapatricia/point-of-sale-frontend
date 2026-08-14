/**
 * Interface for the 'Currencies' data
 */
export interface CurrenciesEntity {
  id: string | number; // Primary ID
  name: string;
  code: string;
  active: boolean;
  rate: any;
  isDefault: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
