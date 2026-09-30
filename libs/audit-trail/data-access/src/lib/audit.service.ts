import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';
import { type AuditFilters, type AuditsEntity } from './audit.model';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private readonly apiService = inject(ApiService);

  getPaginatedAudits(filters?: AuditFilters) {
    return this.apiService.get<Page<AuditsEntity>>(
      `/audits/paginated`,
      toHttpParams(filters)
    );
  }
}
