import { Injectable } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import { VatEntity } from '../+state/vat.models';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  constructor(private apiService: ApiService) {}

  getVat() {
    return this.apiService.get<VatEntity>(`/vat/all`);
  }

  updateVat(vatDetails: VatEntity) {
    return this.apiService.put<VatEntity>(
      `/vat/update/${vatDetails.id}`,
      vatDetails
    );
  }
}
