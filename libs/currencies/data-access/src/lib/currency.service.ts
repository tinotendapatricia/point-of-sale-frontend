import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';
import {
  type CreateCurrencyRequest,
  type CurrencyEntity,
  type CurrencyFilters,
  type MakeDefaultCurrencyRequest,
  type UpdateRateRequest,
} from './currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly apiService = inject(ApiService);

  getPaginatedCurrencies(filters?: CurrencyFilters) {
    return this.apiService.get<Page<CurrencyEntity>>(
      `/currencies/paginated`,
      toHttpParams(filters)
    );
  }

  createCurrency(currencyDetails: CreateCurrencyRequest) {
    return this.apiService.post<CurrencyEntity>(
      `/currencies/create`,
      currencyDetails
    );
  }

  makeDefaultCurrency(details: MakeDefaultCurrencyRequest) {
    return this.apiService.patch<CurrencyEntity>(
      `/currencies/default/${details.id}`
    );
  }

  getCurrency(currencyId: string | number) {
    return this.apiService.get<CurrencyEntity>(`/currencies/${currencyId}`);
  }

  getDefaultCurrency() {
    return this.apiService.get<CurrencyEntity>(`/currencies/default`);
  }

  updateCurrency(currencyDetails: CurrencyEntity) {
    return this.apiService.put<CurrencyEntity>(
      `/currencies/update/${currencyDetails.id}`,
      currencyDetails
    );
  }

  updateRate(details: UpdateRateRequest) {
    return this.apiService.put<CurrencyEntity>(
      `/rates/update/${details.id}`,
      details
    );
  }

  deleteCurrency(currencyId: string | number) {
    return this.apiService.delete<void>(`/currencies/${currencyId}`);
  }

  getAllCurrencies() {
    return this.apiService.get<CurrencyEntity[]>(`/currencies/all`);
  }
}
