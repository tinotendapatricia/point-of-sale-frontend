import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignConfigurationRolesRequest,
  type ConfigurationFilters,
  type ConfigurationRequest,
  type ConfigurationsEntity,
  type PendingCashup,
  type UpdateConfigurationRequest,
} from './configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly apiService = inject(ApiService);

  getPaginatedConfigurations(filters?: ConfigurationFilters) {
    return this.apiService.get<Page<ConfigurationsEntity>>(
      `/configurations/paginated`,
      toHttpParams(filters)
    );
  }

  createConfiguration(details: ConfigurationRequest) {
    return this.apiService.post<ConfigurationsEntity>(
      `/configurations/create`,
      details
    );
  }

  assignConfigurationRoles(details: AssignConfigurationRolesRequest) {
    return this.apiService.put<ConfigurationsEntity>(
      `/configurations/assign-roles/${details.configurationId}`,
      details
    );
  }

  getConfiguration(id: string | number) {
    return this.apiService.get<ConfigurationsEntity>(`/configurations/${id}`);
  }

  updateConfiguration(details: UpdateConfigurationRequest) {
    return this.apiService.put<ConfigurationsEntity>(
      `/configurations/update/${details.id}`,
      details
    );
  }

  deleteConfiguration(id: string | number) {
    return this.apiService.delete<void>(`/configurations/${id}`);
  }

  getAllConfigurations() {
    return this.apiService.get<ConfigurationsEntity[]>(`/configurations/all`);
  }

  getPendingCashups() {
    return this.apiService.get<PendingCashup[]>(`/cash-up/pending`);
  }
}
