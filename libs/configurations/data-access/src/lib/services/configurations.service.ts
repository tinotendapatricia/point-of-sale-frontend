import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService,Page } from '@pos-frontend/shared/data-access';
import { ConfigurationsEntity } from '../models/configurations.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  constructor(private apiService: ApiService) {}

  getPaginatedConfigurations(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<ConfigurationsEntity>>(
      `/configurations/paginated`,
      httpParams
    );
  }

  createConfiguration(configurationDetails: ConfigurationsEntity) {
    return this.apiService.post<ConfigurationsEntity>(
      `/configurations/create`,
      configurationDetails
    );
  }

  getConfiguration(configurationId: string | number) {
    return this.apiService.get<ConfigurationsEntity>(`/configurations/${configurationId}`);
  }

  updateConfiguration(configurationDetails: ConfigurationsEntity) {
    return this.apiService.put<ConfigurationsEntity>(
      `/configurations/update/${configurationDetails.id}`,
      configurationDetails
    );
  }

  assignConfigurationRoles(configurationDetails: any) {
    return this.apiService.put<ConfigurationsEntity>(
      `/configurations/assign-roles/${configurationDetails.configurationId}`,
      configurationDetails
    );
  }

  deleteConfiguration(configurationId: string | number) {
    return this.apiService.delete(`/configurations/${configurationId}`);
  }

  getAllConfigurations() {
    return this.apiService.get<ConfigurationsEntity[]>(`/configurations/all`);
  }

  getPendingCashup() {
    return this.apiService.get<any>(`/cash-up/pending`);
  }
}
