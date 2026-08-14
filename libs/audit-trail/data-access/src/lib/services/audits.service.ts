import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { AuditsEntity } from '../+state/audits.models';

@Injectable({
  providedIn: 'root'
})
export class AuditsService {
  constructor(private apiService: ApiService) {}
  getPaginatedAudits(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<AuditsEntity>>(
      `/audits/paginated`,
      httpParams
    );
  }
}
