/**
 * Interface for the 'Products' data
 */
export interface ProductsEntity {
  id: string | number; // Primary ID
  name: string;
  code: string;
  barcode: string;
  active: boolean;
  price:period[];
  cost: period[];
  taxable: string;
  quantity: number;
  reorderLevel:number;
  mass: string;
  measuredIn: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}


interface period {
  value:number
  effectiveDate:Date
}
