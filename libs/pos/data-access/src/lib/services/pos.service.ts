import { Injectable } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import { PosEntity } from '../+state/pos.models';

@Injectable({
  providedIn: 'root',
})
export class PosService {
  constructor(private apiService: ApiService) {}

  createPos(posDetails: PosEntity) {
    return this.apiService.post<PosEntity>(`/invoices/create`, posDetails);
  }
}
