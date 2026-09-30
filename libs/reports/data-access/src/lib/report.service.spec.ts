import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;
  const file = new Blob(['report']);
  const api = {
    getFile: jest.fn(() => of(file)),
    postFile: jest.fn(() => of(file)),
  };
  const range = { fromDate: '2024-01-01', toDate: '2024-01-31' };
  const period = '2024-01-01/2024-01-31';

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the file from the api', done => {
    service.getSalesSummaryPdf(range).subscribe(result => {
      expect(result).toBe(file);
      done();
    });
  });

  describe('sales', () => {
    it.each([
      ['getSalesSummaryPdf', `/sales-reports/summary-listing/${period}`],
      ['getSalesSummaryExcel', `/sales-reports/summary-listing-excel/${period}`],
      ['getSalesDetailedPdf', `/sales-reports/detailed-listing/${period}`],
      ['getSalesDetailedExcel', `/sales-reports/detailed-listing-excel/${period}`],
      ['getTopSellingProducts', `/sales-reports/top-selling/${period}`],
    ] as const)('%s calls %s', (method, path) => {
      service[method](range);
      expect(api.getFile).toHaveBeenCalledWith(path);
    });

    it('getGrossProfitReport sends 0 when no debtor is picked', () => {
      service.getGrossProfitReport({ ...range, debtor: '' });
      expect(api.getFile).toHaveBeenCalledWith(
        `/sales-reports/gross-profit/${period}/0`
      );
    });

    it('getSalesByProductPdf and Excel send the product', () => {
      service.getSalesByProductPdf({ ...range, product: 7 });
      service.getSalesByProductExcel({ ...range, product: 7 });
      expect(api.getFile).toHaveBeenCalledWith(
        `/sales-reports/by-product-pdf/${period}/7`
      );
      expect(api.getFile).toHaveBeenCalledWith(
        `/sales-reports/by-product-excel/${period}/7`
      );
    });

    it('getSalesByDebtorPdf and Excel send the debtor', () => {
      service.getSalesByDebtorPdf({ ...range, debtor: 3 });
      service.getSalesByDebtorExcel({ ...range });
      expect(api.getFile).toHaveBeenCalledWith(
        `/sales-reports/by-debtor-pdf/${period}/3`
      );
      expect(api.getFile).toHaveBeenCalledWith(
        `/sales-reports/by-debtor-excel/${period}/0`
      );
    });

    it('generateCashup posts the cash-up', () => {
      const cashup = {
        cashup: [{ code: 'USD', total: 10 }],
        station: 'T1',
        tDate: '2024-01-01',
      };
      service.generateCashup(cashup);
      expect(api.postFile).toHaveBeenCalledWith('/cash-up/generate', cashup);
    });
  });

  describe('purchases', () => {
    it.each([
      ['getPurchaseOrderPdf', '/purchase-order-reports/by-order-number-pdf/5'],
      ['getPurchaseOrderExcel', '/purchase-order-reports/by-order-number-excel/5'],
    ] as const)('%s calls %s', (method, path) => {
      service[method]({ orderNumber: 5 });
      expect(api.getFile).toHaveBeenCalledWith(path);
    });

    it.each([
      ['getGrvPdf', '/purchase-order-reports/by-grv-number-pdf/9'],
      ['getGrvExcel', '/purchase-order-reports/by-grv-number-excel/9'],
    ] as const)('%s calls %s', (method, path) => {
      service[method]({ grvNumber: 9 });
      expect(api.getFile).toHaveBeenCalledWith(path);
    });

    it.each([
      ['getPurchasesVsGrvSummaryPdf', `/purchase-order-reports/purchases-grv-summary-pdf/${period}`],
      ['getPurchasesVsGrvSummaryExcel', `/purchase-order-reports/purchases-grv-summary-excel/${period}`],
      ['getPurchasesVsGrvDetailPdf', `/purchase-order-reports/purchases-grv-detail-pdf/${period}`],
      ['getPurchasesVsGrvDetailExcel', `/purchase-order-reports/purchases-grv-detail-excel/${period}`],
    ] as const)('%s calls %s', (method, path) => {
      service[method](range);
      expect(api.getFile).toHaveBeenCalledWith(path);
    });
  });

  describe('stock', () => {
    it('product and period endpoints', () => {
      service.getStockMovementByProduct({ product: 'P1' });
      service.getStockByProduct({ product: 'P1' });
      service.getStockMovementByProductAndPeriod({ ...range, product: 'P1' });
      service.getStockMovementByPeriod(range);
      service.getStockTakesForPeriod(range);
      expect(api.getFile).toHaveBeenCalledWith('/reports/stock-movement-product/P1');
      expect(api.getFile).toHaveBeenCalledWith('/reports/stock-oroduct/P1');
      expect(api.getFile).toHaveBeenCalledWith(
        `/reports/stock-movement-product/${period}/P1`
      );
      expect(api.getFile).toHaveBeenCalledWith(
        `/reports/stock-movement-period/${period}`
      );
      expect(api.getFile).toHaveBeenCalledWith(
        `/stock-reports/adjustment-vs-batch/period/${period}`
      );
    });

    it('batch and adjustment endpoints', () => {
      service.getBatchReport({ batchNumber: 1 });
      service.getAdjustmentReport({ adjustmentNumber: 2 });
      service.getAdjustmentVsBatchReport({ batch: 3 });
      service.getCurrentStockListing();
      expect(api.getFile).toHaveBeenCalledWith('/stock-reports/batch/1');
      expect(api.getFile).toHaveBeenCalledWith('/stock-reports/adjustment/2');
      expect(api.getFile).toHaveBeenCalledWith(
        '/stock-reports/adjustment-vs-batch/3'
      );
      expect(api.getFile).toHaveBeenCalledWith(
        '/stock-reports/current-stock-listing'
      );
    });
  });
});
