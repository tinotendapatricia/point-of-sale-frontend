import { Injectable } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesReportsService {

  constructor(
    private apiService: ApiService,
    //private spinner: NgxSpinnerService
  ) {}

  getPurchasesReportsByPurchaseOrder(orderNumber:number) {
    return this.apiService.getFile(`/purchase-order-reports/by-order-number-pdf/${orderNumber}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getPurchasesReportsByPurchaseOrderExcel(orderNumber:number) {
    return this.apiService.getFile(`/purchase-order-reports/by-order-number-excel/${orderNumber}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  grvByGrvNumber(orderNumber:number) {
    return this.apiService.getFile(`/purchase-order-reports/by-grv-number-pdf/${orderNumber}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  grvByGrvNumberExcel(orderNumber:number) {
    return this.apiService.getFile(`/purchase-order-reports/by-grv-number-excel/${orderNumber}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  purchasesVsGrvSummaryPDF(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/purchase-order-reports/purchases-grv-summary-pdf/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  purchasesVsGrvSummaryExcel(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/purchase-order-reports/purchases-grv-summary-excel/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  purchasesVsGrvDetailPDF(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/purchase-order-reports/purchases-grv-detail-pdf/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  purchasesVsGrvDetailExcel(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/purchase-order-reports/purchases-grv-detail-excel/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }


}