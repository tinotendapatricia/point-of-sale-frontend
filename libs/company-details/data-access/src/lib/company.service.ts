import { Injectable, inject } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';

import {
  type CompanyEntity,
  type CompanyRequest,
  type LicenseSystemRequest,
  type UpdateCompanyRequest,
} from './company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly apiService = inject(ApiService);

  createCompany(details: CompanyRequest) {
    return this.apiService.post<CompanyEntity>(`/company/create`, details);
  }

  licenseSystem(details: LicenseSystemRequest) {
    return this.apiService.put<CompanyEntity>(`/company/license`, details);
  }

  /** The single company this installation belongs to. */
  getCompany() {
    return this.apiService.get<CompanyEntity>('/company/one');
  }

  getLicense() {
    return this.apiService.get<CompanyEntity>(`/company/license`);
  }

  updateCompany(details: UpdateCompanyRequest) {
    return this.apiService.put<CompanyEntity>(
      `/company/update/${details.id}`,
      details
    );
  }

  deleteCompany(id: string | number) {
    return this.apiService.delete<void>(`/company/${id}`);
  }

  getAllCompanies() {
    return this.apiService.get<CompanyEntity[]>(`/company/all`);
  }
}
