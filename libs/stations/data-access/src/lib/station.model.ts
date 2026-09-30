import { type BaseEntity } from '@pos-frontend/core';

export interface StationsEntity extends BaseEntity {
  number: number;
  name: string;
}

/**
 * What the station form sends on create. Kept verbatim from the legacy form.
 * TODO: confirm fields with backend (the entity only exposes `number`/`name`).
 */
export interface CreateStationRequest {
  name: string;
  account: string;
  address: string;
  contact: string;
}

export interface UpdateStationRequest extends CreateStationRequest {
  id: string | number;
}

export interface AssignStationRolesRequest {
  stationId: string | number;
  // TODO: confirm fields with backend (legacy scaffold endpoint, no UI uses it)
  roles: (string | number)[];
}

export interface StationFilters {
  page?: number;
  size?: number;
  /** Comma separated `property:value` pairs. */
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}
