import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignStationRolesRequest,
  type CreateStationRequest,
  type StationFilters,
  type StationsEntity,
  type UpdateStationRequest,
} from './station.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private readonly apiService = inject(ApiService);

  getPaginatedStations(filters?: StationFilters) {
    return this.apiService.get<Page<StationsEntity>>(
      `/stations/paginated`,
      toHttpParams(filters)
    );
  }

  createStation(details: CreateStationRequest) {
    return this.apiService.post<StationsEntity>(`/stations/create`, details);
  }

  assignStationRoles(details: AssignStationRolesRequest) {
    return this.apiService.put<StationsEntity>(
      `/stations/assign-roles/${details.stationId}`,
      details
    );
  }

  getStation(id: string | number) {
    return this.apiService.get<StationsEntity>(`/stations/${id}`);
  }

  // TODO: confirm with backend; `rupdate` is kept verbatim from the legacy service.
  updateStation(details: UpdateStationRequest) {
    return this.apiService.put<StationsEntity>(
      `/stations/rupdate/${details.id}`,
      details
    );
  }

  deleteStation(id: string | number) {
    return this.apiService.delete(`/stations/${id}`);
  }

  getAllStations() {
    return this.apiService.get<StationsEntity[]>(`/stations/all`);
  }
}
