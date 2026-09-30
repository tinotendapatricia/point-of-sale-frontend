/** Denomination line on a till cash-up. */
interface Denomination {
  type: string;
  value: number;
}

export interface CashupEntity {
  code: string;
  denominations: Denomination[];
}

/** Inclusive date range, dates formatted as the backend expects (yyyy-MM-dd). */
export interface DateRangeReportRequest {
  fromDate: string;
  toDate: string;
}

/** Empty or missing ids are sent as 0, which the backend reads as "all". */
export type OptionalId = string | number | null | undefined;

export interface ProductReportRequest extends DateRangeReportRequest {
  product?: OptionalId;
}

export interface DebtorReportRequest extends DateRangeReportRequest {
  debtor?: OptionalId;
}

export interface OrderNumberReportRequest {
  orderNumber: string | number;
}

export interface GrvNumberReportRequest {
  grvNumber: string | number;
}

export interface StockByProductRequest {
  product: string | number;
}

export type StockByProductAndPeriodRequest = DateRangeReportRequest &
  StockByProductRequest;

export interface BatchReportRequest {
  batchNumber: string | number;
}

export interface AdjustmentReportRequest {
  adjustmentNumber: string | number;
}

export interface AdjustmentVsBatchReportRequest {
  batch: string | number;
}

export interface CashupTotal {
  code: string;
  total: number;
}

/** Body of POST /cash-up/generate, as emitted by the cash-up form. */
export interface CashupRequest {
  cashup: CashupTotal[];
  station: string;
  tDate: string;
}
