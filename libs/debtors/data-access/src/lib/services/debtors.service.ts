import { Injectable } from '@angular/core';
import { DebtorsEntity } from '../+state/debtors.models';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DebtorsService {
  constructor(private apiService: ApiService) {}

  getPaginatedDebtors(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<DebtorsEntity>>(
      `/debtors/paginated`,
      httpParams
    );
  }

  createDebtor(debtorDetails: DebtorsEntity) {
    return this.apiService.post<DebtorsEntity>(
      `/debtors/create`,
      debtorDetails
    );
  }

  getDebtor(debtorId: string | number) {
    return this.apiService.get<DebtorsEntity>(`/debtors/${debtorId}`);
  }

  updateDebtor(debtorDetails: DebtorsEntity) {
    return this.apiService.put<DebtorsEntity>(
      `/debtors/update/${debtorDetails.id}`,
      debtorDetails
    );
  }

  assignDebtorRoles(debtorDetails: any) {
    return this.apiService.put<DebtorsEntity>(
      `/debtors/assign-roles/${debtorDetails.debtorId}`,
      debtorDetails
    );
  }

  deleteDebtor(debtorId: string | number) {
    return this.apiService.delete(`/debtors/${debtorId}`);
  }

  getAllDebtors() {
    return this.apiService.get<DebtorsEntity[]>(`/debtors/all`);
  }
}
