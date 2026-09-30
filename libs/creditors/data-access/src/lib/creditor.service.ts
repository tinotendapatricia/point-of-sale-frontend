import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignCreditorRolesRequest,
  type CreditorFilters,
  type CreditorRequest,
  type CreditorsEntity,
  type UpdateCreditorRequest,
} from './creditor.model';

@Injectable({
  providedIn: 'root',
})
export class CreditorService {
  private readonly apiService = inject(ApiService);

  getPaginatedCreditors(filters?: CreditorFilters) {
    return this.apiService.get<Page<CreditorsEntity>>(
      `/creditors/paginated`,
      toHttpParams(filters)
    );
  }

  createCreditor(details: CreditorRequest) {
    return this.apiService.post<CreditorsEntity>(`/creditors/create`, details);
  }

  assignCreditorRoles(details: AssignCreditorRolesRequest) {
    return this.apiService.put<CreditorsEntity>(
      `/creditors/assign-roles/${details.creditorId}`,
      details
    );
  }

  getCreditor(id: string | number) {
    return this.apiService.get<CreditorsEntity>(`/creditors/${id}`);
  }

  updateCreditor(details: UpdateCreditorRequest) {
    return this.apiService.put<CreditorsEntity>(
      `/creditors/update/${details.id}`,
      details
    );
  }

  deleteCreditor(id: string | number) {
    return this.apiService.delete<void>(`/creditors/${id}`);
  }

  getAllCreditors() {
    return this.apiService.get<CreditorsEntity[]>(`/creditors/all`);
  }
}
