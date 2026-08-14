import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockReportsContainerComponent } from './stock-reports-container/stock-reports-container.component';
import { CurrentStockListingReportComponent } from './current-stock-listing-report/current-stock-listing-report.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClarityModule } from '@clr/angular';
import { ReportsDataAccessModule } from '@pos-frontend/reports/data-access';
import { ReportsUiModule } from '@pos-frontend/reports/ui';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { PrintBatchComponent } from './print-batch/print-batch.component';
import { PrintAdjustmentComponent } from './print-adjustment/print-adjustment.component';
import { AdjustmentVsBatchComponent } from './adjustment-vs-batch/adjustment-vs-batch.component';
import { StockTakeForPeriodComponent } from './stock-take-for-period/stock-take-for-period.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    ClarityModule,
    ReportsDataAccessModule,
    ReportsUiModule,
    ProductsDataAccessModule,

    RouterModule.forChild([
      { path: '', component: StockReportsContainerComponent },
    ]),
  ],
  declarations: [
    StockReportsContainerComponent,
    CurrentStockListingReportComponent,
    PrintBatchComponent,
    PrintAdjustmentComponent,
    AdjustmentVsBatchComponent,
    StockTakeForPeriodComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AdminFeatureStockReportsModule {}
