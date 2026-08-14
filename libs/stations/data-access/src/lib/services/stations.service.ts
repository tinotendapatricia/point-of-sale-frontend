import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { StationsEntity } from '../+state/stations.models';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  constructor(private apiService: ApiService) {}

  getPaginatedStations(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<StationsEntity>>(
      `/stations/paginated`,
      httpParams
    );
  }

  createStation(stationDetails: StationsEntity) {
    return this.apiService.post<StationsEntity>(
      `/stations/create`,
      stationDetails
    );
  }

  getStation(stationId: string | number) {
    return this.apiService.get<StationsEntity>(`/stations/${stationId}`);
  }

  updateStation(stationDetails: StationsEntity) {
    return this.apiService.put<StationsEntity>(
      `/stations/rupdate/${stationDetails.id}`,
      stationDetails
    );
  }

  assignStationRoles(stationDetails: any) {
    return this.apiService.put<StationsEntity>(
      `/stations/assign-roles/${stationDetails.stationId}`,
      stationDetails
    );
  }

  deleteStation(stationId: string | number) {
    return this.apiService.delete(`/stations/${stationId}`);
  }

  getAllStations() {
    return this.apiService.get<StationsEntity[]>(`/stations/all`);
  }
}
