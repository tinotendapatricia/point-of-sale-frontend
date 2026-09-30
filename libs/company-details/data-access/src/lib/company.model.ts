import { type BaseEntity } from '@pos-frontend/core';

export interface CompanyEntity extends BaseEntity {
  name: string;
  email: string;
  bpNumber: string;
  address: string;
  tinNumber: string;
  phone: string;
  license: string;
  licenseExpDate: string;
}

/** What the company form edits: no id, license or audit fields. */
export type CompanyRequest = Pick<
  CompanyEntity,
  'name' | 'address' | 'bpNumber' | 'tinNumber' | 'email' | 'phone'
>;

export interface UpdateCompanyRequest extends CompanyRequest {
  id: string | number;
}

export interface LicenseSystemRequest {
  id: string | number;
  license: string;
}
