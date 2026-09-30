import { type BaseEntity } from '@pos-frontend/core';

/** The single, system-wide VAT setting. */
export interface VatEntity extends BaseEntity {
  /** VAT rate as a percentage, e.g. 15. */
  vat: number;
}
