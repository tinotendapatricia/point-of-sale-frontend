import { type BaseEntity } from '@pos-frontend/core';

export interface ConfigurationsEntity extends BaseEntity {
  printerName: string;
  stationName: string;
  stationNumber: number;
  copies: number;
}

/** What the configuration form edits: the entity minus id and audit fields. */
export type ConfigurationRequest = Pick<
  ConfigurationsEntity,
  'printerName' | 'stationName' | 'stationNumber' | 'copies'
>;

export interface UpdateConfigurationRequest extends ConfigurationRequest {
  id: string | number;
}

export interface ConfigurationFilters {
  page?: number;
  size?: number;
  /** Comma-separated `property:value` pairs. */
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}

export interface AssignConfigurationRolesRequest {
  configurationId: string | number;
  // TODO: confirm fields with backend
  roles?: (string | number)[];
}

/** A till station awaiting cash-up, as returned by `/cash-up/pending`. */
export interface PendingCashup {
  // TODO: confirm fields with backend
  station: string | number;
  tDate: string;
}
