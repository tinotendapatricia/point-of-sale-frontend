import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { CurrenciesEntity } from '../+state/currencies.models';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private apiService: ApiService) {}

  getPaginatedCurrencies(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<CurrenciesEntity>>(
      `/currencies/paginated`,
      httpParams
    );
  }

  createCurrency(currencyDetails: CurrenciesEntity) {
    return this.apiService.post<CurrenciesEntity>(
      `/currencies/create`,
      currencyDetails
    );
  }

  makeDefaultCurrency(currencyDetails: CurrenciesEntity) {
    return this.apiService.patch<CurrenciesEntity>(
      `/currencies/default/${currencyDetails.id}`
    );
  }

  getCurrency(currencyId: string | number) {
    return this.apiService.get<CurrenciesEntity>(`/currencies/${currencyId}`);
  }

  getDefaultCurrency() {
    return this.apiService.get<CurrenciesEntity>(`/currencies/default`);
  }

  updateCurrency(currencyDetails: CurrenciesEntity) {
    return this.apiService.put<CurrenciesEntity>(
      `/currencies/update/${currencyDetails.id}`,
      currencyDetails
    );
  }

  updateRate(currencyDetails: any) {
    return this.apiService.put<CurrenciesEntity>(
      `/rates/update/${currencyDetails.id}`,
      currencyDetails
    );
  }

  deleteCurrency(currencyId: string | number) {
    return this.apiService.delete(`/currencies/${currencyId}`);
  }

  getAllCurrencies() {
    return this.apiService.get<CurrenciesEntity[]>(`/currencies/all`);
  }
}
