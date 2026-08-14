/**
 * Interface for the 'Creditors' data
 */
export interface CreditorsEntity {
  id: string | number; // Primary ID
  name: string;
  account: string;
  contact: string;
  address: string;
  updatedBy: string;
  createdBy: string;
  updatedAt: string;
  createdAt: string;
}
