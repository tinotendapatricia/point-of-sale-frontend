import { Injectable, inject } from '@angular/core';
import { ApiService } from '@pos-frontend/shared/data-access';
import {
  type AdjustmentReportRequest,
  type AdjustmentVsBatchReportRequest,
  type BatchReportRequest,
  type CashupRequest,
  type DateRangeReportRequest,
  type DebtorReportRequest,
  type GrvNumberReportRequest,
  type OptionalId,
  type OrderNumberReportRequest,
  type ProductReportRequest,
  type StockByProductAndPeriodRequest,
  type StockByProductRequest,
} from './report.model';

/** The backend treats 0 as "no filter"; the forms send '' when nothing is picked. */
const orZero = (id: OptionalId): string | number =>
  id === undefined || id === null || id === '' ? 0 : id;

/** Every report endpoint returns a file (Blob). */
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly apiService = inject(ApiService);

  // ---------- Sales ----------

  getSalesSummaryPdf({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/summary-listing/${fromDate}/${toDate}`
    );
  }

  getSalesSummaryExcel({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/summary-listing-excel/${fromDate}/${toDate}`
    );
  }

  getSalesDetailedPdf({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/detailed-listing/${fromDate}/${toDate}`
    );
  }

  getSalesDetailedExcel({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/detailed-listing-excel/${fromDate}/${toDate}`
    );
  }

  getGrossProfitReport({ fromDate, toDate, debtor }: DebtorReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/gross-profit/${fromDate}/${toDate}/${orZero(debtor)}`
    );
  }

  getSalesByProductPdf({ fromDate, toDate, product }: ProductReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/by-product-pdf/${fromDate}/${toDate}/${orZero(product)}`
    );
  }

  getSalesByProductExcel({ fromDate, toDate, product }: ProductReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/by-product-excel/${fromDate}/${toDate}/${orZero(product)}`
    );
  }

  getSalesByDebtorPdf({ fromDate, toDate, debtor }: DebtorReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/by-debtor-pdf/${fromDate}/${toDate}/${orZero(debtor)}`
    );
  }

  getSalesByDebtorExcel({ fromDate, toDate, debtor }: DebtorReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/by-debtor-excel/${fromDate}/${toDate}/${orZero(debtor)}`
    );
  }

  getTopSellingProducts({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/sales-reports/top-selling/${fromDate}/${toDate}`
    );
  }

  generateCashup(details: CashupRequest) {
    return this.apiService.postFile(`/cash-up/generate`, details);
  }

  // ---------- Purchases ----------

  getPurchaseOrderPdf({ orderNumber }: OrderNumberReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/by-order-number-pdf/${orderNumber}`
    );
  }

  getPurchaseOrderExcel({ orderNumber }: OrderNumberReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/by-order-number-excel/${orderNumber}`
    );
  }

  getGrvPdf({ grvNumber }: GrvNumberReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/by-grv-number-pdf/${grvNumber}`
    );
  }

  getGrvExcel({ grvNumber }: GrvNumberReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/by-grv-number-excel/${grvNumber}`
    );
  }

  getPurchasesVsGrvSummaryPdf({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/purchases-grv-summary-pdf/${fromDate}/${toDate}`
    );
  }

  getPurchasesVsGrvSummaryExcel({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/purchases-grv-summary-excel/${fromDate}/${toDate}`
    );
  }

  getPurchasesVsGrvDetailPdf({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/purchases-grv-detail-pdf/${fromDate}/${toDate}`
    );
  }

  getPurchasesVsGrvDetailExcel({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/purchase-order-reports/purchases-grv-detail-excel/${fromDate}/${toDate}`
    );
  }

  // ---------- Stock ----------

  getStockMovementByProduct({ product }: StockByProductRequest) {
    return this.apiService.getFile(`/reports/stock-movement-product/${product}`);
  }

  getStockByProduct({ product }: StockByProductRequest) {
    // "oroduct" is the backend's spelling of the path.
    return this.apiService.getFile(`/reports/stock-oroduct/${product}`);
  }

  getStockMovementByProductAndPeriod({
    fromDate,
    toDate,
    product,
  }: StockByProductAndPeriodRequest) {
    return this.apiService.getFile(
      `/reports/stock-movement-product/${fromDate}/${toDate}/${product}`
    );
  }

  getStockMovementByPeriod({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/reports/stock-movement-period/${fromDate}/${toDate}`
    );
  }

  getBatchReport({ batchNumber }: BatchReportRequest) {
    return this.apiService.getFile(`/stock-reports/batch/${batchNumber}`);
  }

  getAdjustmentReport({ adjustmentNumber }: AdjustmentReportRequest) {
    return this.apiService.getFile(
      `/stock-reports/adjustment/${adjustmentNumber}`
    );
  }

  getAdjustmentVsBatchReport({ batch }: AdjustmentVsBatchReportRequest) {
    return this.apiService.getFile(
      `/stock-reports/adjustment-vs-batch/${batch}`
    );
  }

  getStockTakesForPeriod({ fromDate, toDate }: DateRangeReportRequest) {
    return this.apiService.getFile(
      `/stock-reports/adjustment-vs-batch/period/${fromDate}/${toDate}`
    );
  }

  getCurrentStockListing() {
    return this.apiService.getFile(`/stock-reports/current-stock-listing`);
  }
}
