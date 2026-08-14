import { Injectable } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private apiService: ApiService,
    //private spinner: NgxSpinnerService
  ) {}

  getAllSalesForPeriodPDFSummary(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/sales-reports/summary-listing/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesForPeriodExcelSummary(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/sales-reports/summary-listing-excel/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesForPeriodPDFDetailed(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/sales-reports/detailed-listing/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesForPeriodExcelDetailed(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/sales-reports/detailed-listing-excel/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  generateGPReport(fromDate:string, toDate:string,debtor?:number) {
    return this.apiService.getFile(`/sales-reports/gross-profit/${fromDate}/${toDate}/${debtor?debtor:0}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesForPeriodByProductPDF(fromDate:string, toDate:string, product:string) {
    return this.apiService.getFile(`/sales-reports/by-product-pdf/${fromDate}/${toDate}/${product?product:0}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesForPeriodByProductExcel(fromDate:string, toDate:string, product:string) {
    return this.apiService.getFile(`/sales-reports/by-product-excel/${fromDate}/${toDate}/${product?product:0}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesByDebtorPDF(fromDate:string, toDate:string, debtor:string) {
    return this.apiService.getFile(`/sales-reports/by-debtor-pdf/${fromDate}/${toDate}/${debtor?debtor:0}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getTopSellingProduct(fromDate:string, toDate:string,) {
    return this.apiService.getFile(`/sales-reports/top-selling/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getAllSalesByDebtorExcel(fromDate:string, toDate:string, debtor:string) {
    return this.apiService.getFile(`/sales-reports/by-debtor-excel/${fromDate}/${toDate}/${debtor?debtor:0}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }



  getCurrentStockMovementByProduct(product:string) {
    return this.apiService.getFile(`/reports/stock-movement-product/${product}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getCurrentStockByProduct(product:string) {
    return this.apiService.getFile(`/reports/stock-oroduct/${product}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getCurrentStockMovementByProductandPeriod(fromDate:string, toDate:string,product:string) {
    return this.apiService.getFile(`/reports/stock-movement-product/${fromDate}/${toDate}/${product}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getCurrentStockMovementByPeriod(fromDate:string, toDate:string) {
    return this.apiService.getFile(`/reports/stock-movement-period/${fromDate}/${toDate}`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }

  getCashup(details:any) {
    return this.apiService.postFile(`/cash-up/generate`, details).pipe(
      tap((res) => {
 
        Utilities.displayFile(res);
      })
    );
  }

  printBatch(details:any) {
    return this.apiService.getFile(`/stock-reports/batch/${details.batchNumber}`).pipe(
      tap((res) => {
 
        Utilities.displayFile(res);
      })
    );
  }

  printAdjustment(details:any) {
    return this.apiService.getFile(`/stock-reports/adjustment/${details.adjustmentNumber}`).pipe(
      tap((res) => {
 
        Utilities.displayFile(res);
      })
    );
  }

  printAdjustmentVsBatch(details:any) {
    return this.apiService.getFile(`/stock-reports/adjustment-vs-batch/${details.batch}`).pipe(
      tap((res) => {
 
        Utilities.displayFile(res);
      })
    );
  }

  printStockTakesForPeriod(details:any) {
    return this.apiService.getFile(`/stock-reports/adjustment-vs-batch/period/${details.fromDate}/${details.toDate}`).pipe(
      tap((res) => {
 
        Utilities.displayFile(res);
      })
    );
  }

  getCurrentStockListings() {
    return this.apiService.getFile(`/stock-reports/current-stock-listing`).pipe(
      tap((res) => {
        Utilities.displayFile(res);
      })
    );
  }
}
