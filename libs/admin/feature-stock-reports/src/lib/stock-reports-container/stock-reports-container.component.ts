import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrTabsModule } from '@clr/angular/layout/tabs';
import { ClrIfActive } from '@clr/angular/utils';
import { CurrentStockListingReportComponent } from '../current-stock-listing-report/current-stock-listing-report.component';
import { PrintBatchComponent } from '../print-batch/print-batch.component';
import { PrintAdjustmentComponent } from '../print-adjustment/print-adjustment.component';
import { AdjustmentVsBatchComponent } from '../adjustment-vs-batch/adjustment-vs-batch.component';
import { StockTakeForPeriodComponent } from '../stock-take-for-period/stock-take-for-period.component';

@Component({
    selector: 'pos-frontend-stock-reports-container',
    templateUrl: './stock-reports-container.component.html',
    styleUrls: ['./stock-reports-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrTabsModule, ClrIfActive, CurrentStockListingReportComponent, PrintBatchComponent, PrintAdjustmentComponent, AdjustmentVsBatchComponent, StockTakeForPeriodComponent]
})
export class StockReportsContainerComponent {}
