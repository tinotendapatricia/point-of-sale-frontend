import { Injectable, inject } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';

import { type VatEntity } from './vat.model';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  private readonly apiService = inject(ApiService);

  /** The backend exposes the single VAT setting under `/vat/all`. */
  getVat() {
    return this.apiService.get<VatEntity>(`/vat/all`);
  }

  updateVat(details: VatEntity) {
    return this.apiService.put<VatEntity>(`/vat/update/${details.id}`, details);
  }
}
