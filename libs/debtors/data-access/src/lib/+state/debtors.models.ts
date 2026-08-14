/**
 * Interface for the 'Debtors' data
 */
export interface DebtorsEntity {
  id: string | number; // Primary ID
  name: string;
  account: string;
  discount: number;
  currency: any;
}
