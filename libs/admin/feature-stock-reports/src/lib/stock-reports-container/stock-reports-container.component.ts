import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AdjustmentVsBatchComponent } from '../adjustment-vs-batch/adjustment-vs-batch.component';
import { CurrentStockListingReportComponent } from '../current-stock-listing-report/current-stock-listing-report.component';
import { PrintAdjustmentComponent } from '../print-adjustment/print-adjustment.component';
import { PrintBatchComponent } from '../print-batch/print-batch.component';
import { StockTakeForPeriodComponent } from '../stock-take-for-period/stock-take-for-period.component';

@Component({
  selector: 'pos-frontend-stock-reports-container',
  templateUrl: './stock-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    CurrentStockListingReportComponent,
    PrintBatchComponent,
    PrintAdjustmentComponent,
    AdjustmentVsBatchComponent,
    StockTakeForPeriodComponent,
  ],
})
export class StockReportsContainerComponent {}
