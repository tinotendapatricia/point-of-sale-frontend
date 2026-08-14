import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { CreditorsEntity } from '../+state/creditors.models';

@Injectable({
  providedIn: 'root',
})
export class CreditorsService {
  constructor(private apiService: ApiService) {}

  getPaginatedCreditors(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<CreditorsEntity>>(
      `/creditors/paginated`,
      httpParams
    );
  }

  createCreditor(creditorDetails: CreditorsEntity) {
    return this.apiService.post<CreditorsEntity>(
      `/creditors/create`,
      creditorDetails
    );
  }

  getCreditor(creditorId: string | number) {
    return this.apiService.get<CreditorsEntity>(`/creditors/${creditorId}`);
  }

  updateCreditor(creditorDetails: CreditorsEntity) {
    return this.apiService.put<CreditorsEntity>(
      `/creditors/update/${creditorDetails.id}`,
      creditorDetails
    );
  }

  assignCreditorRoles(creditorDetails: any) {
    return this.apiService.put<CreditorsEntity>(
      `/creditors/assign-roles/${creditorDetails.creditorId}`,
      creditorDetails
    );
  }

  deleteCreditor(creditorId: string | number) {
    return this.apiService.delete(`/creditors/${creditorId}`);
  }

  getAllCreditors() {
    return this.apiService.get<CreditorsEntity[]>(`/creditors/all`);
  }
}
