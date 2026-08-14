/**
 * Interface for the 'Vat' data
 */
export interface VatEntity {
  id: string | number; // Primary ID
  vat: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
