import { BaseEntity } from '@pos-frontend/core';
export interface ProductsEntity extends BaseEntity {

  name: string;
  code: string;
  barcode: string;
  active: boolean;
  price:Period[];
  cost: Period[];
  taxable: string;
  quantity: number;
  reorderLevel:number;
  mass: string;
  measuredIn: string;
}


interface Period {
  value:number
  effectiveDate:Date
}
