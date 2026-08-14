import { Injectable } from '@angular/core';
import { CompanyEntity } from '../models/company.model';
import { ApiService, Page } from '@pos-frontend/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private apiService: ApiService) {}


  createCompany(companyDetails: CompanyEntity) {
    return this.apiService.post<CompanyEntity>(
      `/company/create`,
      companyDetails
    );
  }

  getCompany() {
    return this.apiService.get<CompanyEntity>('/company/one');
  }

  updateCompany(companyDetails: CompanyEntity) {
    return this.apiService.put<CompanyEntity>(
      `/company/update/${companyDetails.id}`,
      companyDetails
    );
  }

  licenseSystem(companyDetails: any) {
    return this.apiService.put<CompanyEntity>(
      `/company/license`,
      companyDetails
    );
  }

  getLicense() {
    return this.apiService.get<CompanyEntity>(
      `/company/license`
    );
  }

  deleteCompany(companyId: string | number) {
    return this.apiService.delete(`/company/${companyId}`);
  }

  getAllCompany() {
    return this.apiService.get<CompanyEntity[]>(`/company/all`);
  }
}
