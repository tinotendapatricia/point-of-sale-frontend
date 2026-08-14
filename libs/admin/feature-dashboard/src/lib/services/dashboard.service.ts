import { Injectable } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) {}


  getLowSelling() {
    return this.apiService.get<any>(`/dashboard/low-selling`);
  }

  getTopSelling() {
    return this.apiService.get<any>(`/dashboard/top-selling`);
  }

  getRecentTransactions() {
    return this.apiService.get<any>(`/dashboard/recent-transactions`);
  }

  getLowStock() {
    return this.apiService.get<any>(`/dashboard/low-stock`);
  }


  
}
