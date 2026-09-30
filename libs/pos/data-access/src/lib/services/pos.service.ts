import { Injectable, inject } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import { type CreateSaleRequest, type PosEntity } from '../+state/pos.models';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  private readonly apiService = inject(ApiService);

  createPos(posDetails: CreateSaleRequest) {
    return this.apiService.post<PosEntity>(`/invoices/create`, posDetails);
  }
}
