import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignDebtorRolesRequest,
  type DebtorFilters,
  type DebtorRequest,
  type DebtorsEntity,
  type UpdateDebtorRequest,
} from './debtor.model';

@Injectable({
  providedIn: 'root',
})
export class DebtorService {
  private readonly apiService = inject(ApiService);

  getPaginatedDebtors(filters?: DebtorFilters) {
    return this.apiService.get<Page<DebtorsEntity>>(
      `/debtors/paginated`,
      toHttpParams(filters)
    );
  }

  createDebtor(details: DebtorRequest) {
    return this.apiService.post<DebtorsEntity>(`/debtors/create`, details);
  }

  assignDebtorRoles(details: AssignDebtorRolesRequest) {
    return this.apiService.put<DebtorsEntity>(
      `/debtors/assign-roles/${details.debtorId}`,
      details
    );
  }

  getDebtor(id: string | number) {
    return this.apiService.get<DebtorsEntity>(`/debtors/${id}`);
  }

  updateDebtor(details: UpdateDebtorRequest) {
    return this.apiService.put<DebtorsEntity>(
      `/debtors/update/${details.id}`,
      details
    );
  }

  deleteDebtor(id: string | number) {
    return this.apiService.delete(`/debtors/${id}`);
  }

  getAllDebtors() {
    return this.apiService.get<DebtorsEntity[]>(`/debtors/all`);
  }
}
