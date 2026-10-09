import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { type Observable, pipe, switchMap, tap } from 'rxjs';

import { ToastService } from '@pos-frontend/core';
import { Utilities } from '@pos-frontend/shared/utils';

import { ReportService } from './report.service';
import {
  type AdjustmentReportRequest,
  type AdjustmentVsBatchReportRequest,
  type BatchReportRequest,
  type CashupRequest,
  type DateRangeReportRequest,
  type DebtorReportRequest,
  type GrvNumberReportRequest,
  type OrderNumberReportRequest,
  type ProductReportRequest,
  type ReportDelivery,
  type StockByProductAndPeriodRequest,
  type StockByProductRequest,
} from './report.model';

type ReportCollection = 'sales' | 'purchases' | 'stock' | 'cashup';

/** 'Failed to generate GRV report' -> 'grv-report': the failure text already names the report. */
const fileName = (failure: string): string =>
  failure
    .replace(/^Failed to generate /, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');


export const ReportStore = signalStore(
  { providedIn: 'root' },
  // Reports are opened straight away, so nothing but call state is kept.
  withState({}),
  withDevtools('reports'),
  withReset(),
  withCallState({
    collections: ['sales', 'purchases', 'stock', 'cashup'],
  }),

  withMethods(
    (store, service = inject(ReportService), toast = inject(ToastService)) => {
      /**
       * Builds a read method that fetches a report file and either opens it in
       * a new tab or, with `download: true`, saves it. Newer requests cancel
       * stale ones (switchMap).
       */
      const openReport = <T>(
        collection: ReportCollection,
        failure: string,
        load: (request: T) => Observable<Blob>
      ) =>
        rxMethod<T & ReportDelivery>(
          pipe(
            tap(() => patchState(store, setLoading(collection))),
            switchMap(request =>
              load(request).pipe(
                tapResponse({
                  next: file => {
                    patchState(store, setLoaded(collection));
                    if (request.download) {
                      Utilities.downloadFile(file, fileName(failure));
                    } else {
                      Utilities.displayFile(file);
                    }
                  },
                  error: error => {
                    patchState(store, setError(error, collection));
                    toast.warning(failure);
                  },
                })
              )
            )
          )
        );

      return {
        // ---------- Sales ----------
        getSalesSummaryPdf: openReport<DateRangeReportRequest>(
          'sales',
          'Failed to generate sales summary report',
          request => service.getSalesSummaryPdf(request)
        ),
        getSalesSummaryExcel: openReport<DateRangeReportRequest>(
          'sales',
          'Failed to generate sales summary report',
          request => service.getSalesSummaryExcel(request)
        ),
        getSalesDetailedPdf: openReport<DateRangeReportRequest>(
          'sales',
          'Failed to generate detailed sales report',
          request => service.getSalesDetailedPdf(request)
        ),
        getSalesDetailedExcel: openReport<DateRangeReportRequest>(
          'sales',
          'Failed to generate detailed sales report',
          request => service.getSalesDetailedExcel(request)
        ),
        getGrossProfitReport: openReport<DebtorReportRequest>(
          'sales',
          'Failed to generate gross profit report',
          request => service.getGrossProfitReport(request)
        ),
        getSalesByProductPdf: openReport<ProductReportRequest>(
          'sales',
          'Failed to generate sales by product report',
          request => service.getSalesByProductPdf(request)
        ),
        getSalesByProductExcel: openReport<ProductReportRequest>(
          'sales',
          'Failed to generate sales by product report',
          request => service.getSalesByProductExcel(request)
        ),
        getSalesByDebtorPdf: openReport<DebtorReportRequest>(
          'sales',
          'Failed to generate sales by debtor report',
          request => service.getSalesByDebtorPdf(request)
        ),
        getSalesByDebtorExcel: openReport<DebtorReportRequest>(
          'sales',
          'Failed to generate sales by debtor report',
          request => service.getSalesByDebtorExcel(request)
        ),
        getTopSellingProducts: openReport<DateRangeReportRequest>(
          'sales',
          'Failed to generate top selling products report',
          request => service.getTopSellingProducts(request)
        ),
        generateCashup: openReport<CashupRequest>(
          'cashup',
          'Failed to generate cash-up report',
          request => service.generateCashup(request)
        ),

        // ---------- Purchases ----------
        getPurchaseOrderPdf: openReport<OrderNumberReportRequest>(
          'purchases',
          'Failed to generate purchase order report',
          request => service.getPurchaseOrderPdf(request)
        ),
        getPurchaseOrderExcel: openReport<OrderNumberReportRequest>(
          'purchases',
          'Failed to generate purchase order report',
          request => service.getPurchaseOrderExcel(request)
        ),
        getGrvPdf: openReport<GrvNumberReportRequest>(
          'purchases',
          'Failed to generate GRV report',
          request => service.getGrvPdf(request)
        ),
        getGrvExcel: openReport<GrvNumberReportRequest>(
          'purchases',
          'Failed to generate GRV report',
          request => service.getGrvExcel(request)
        ),
        getPurchasesVsGrvSummaryPdf: openReport<DateRangeReportRequest>(
          'purchases',
          'Failed to generate purchases vs GRV summary report',
          request => service.getPurchasesVsGrvSummaryPdf(request)
        ),
        getPurchasesVsGrvSummaryExcel: openReport<DateRangeReportRequest>(
          'purchases',
          'Failed to generate purchases vs GRV summary report',
          request => service.getPurchasesVsGrvSummaryExcel(request)
        ),
        getPurchasesVsGrvDetailPdf: openReport<DateRangeReportRequest>(
          'purchases',
          'Failed to generate purchases vs GRV detail report',
          request => service.getPurchasesVsGrvDetailPdf(request)
        ),
        getPurchasesVsGrvDetailExcel: openReport<DateRangeReportRequest>(
          'purchases',
          'Failed to generate purchases vs GRV detail report',
          request => service.getPurchasesVsGrvDetailExcel(request)
        ),

        // ---------- Stock ----------
        getStockMovementByProduct: openReport<StockByProductRequest>(
          'stock',
          'Failed to generate stock movement report',
          request => service.getStockMovementByProduct(request)
        ),
        getStockByProduct: openReport<StockByProductRequest>(
          'stock',
          'Failed to generate stock report',
          request => service.getStockByProduct(request)
        ),
        getStockMovementByProductAndPeriod:
          openReport<StockByProductAndPeriodRequest>(
            'stock',
            'Failed to generate stock movement report',
            request => service.getStockMovementByProductAndPeriod(request)
          ),
        getStockMovementByPeriod: openReport<DateRangeReportRequest>(
          'stock',
          'Failed to generate stock movement report',
          request => service.getStockMovementByPeriod(request)
        ),
        getBatchReport: openReport<BatchReportRequest>(
          'stock',
          'Failed to generate batch report',
          request => service.getBatchReport(request)
        ),
        getAdjustmentReport: openReport<AdjustmentReportRequest>(
          'stock',
          'Failed to generate adjustment report',
          request => service.getAdjustmentReport(request)
        ),
        getAdjustmentVsBatchReport: openReport<AdjustmentVsBatchReportRequest>(
          'stock',
          'Failed to generate adjustment vs batch report',
          request => service.getAdjustmentVsBatchReport(request)
        ),
        getStockTakesForPeriod: openReport<DateRangeReportRequest>(
          'stock',
          'Failed to generate stock takes report',
          request => service.getStockTakesForPeriod(request)
        ),
        getCurrentStockListing: openReport<ReportDelivery>(
          'stock',
          'Failed to generate current stock listing',
          () => service.getCurrentStockListing()
        ),
      };
    }
  )
);
