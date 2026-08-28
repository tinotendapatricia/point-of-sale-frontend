import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrTabsModule } from '@clr/angular/layout/tabs';
import { ClrIfActive } from '@clr/angular/utils';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from '../purchases-report-grv-vs-purchases-summary/purchases-report-grv-vs-purchases-summary.component';
import { PurchasesReportGrvVsPurchasesDetailComponent } from '../purchases-report-grv-vs-purchases-detail/purchases-report-grv-vs-purchases-detail.component';
import { PurchasesReportByOrderNumberComponent } from '../purchases-report-by-order-number/purchases-report-by-order-number.component';
import { ReceivingReportByGrvNumberComponent } from '../receiving-report-by-grv-number/receiving-report-by-grv-number.component';

@Component({
    selector: 'pos-frontend-purchases-reports-container',
    templateUrl: './purchases-reports-container.component.html',
    styleUrls: ['./purchases-reports-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrTabsModule, ClrIfActive, PurchasesReportGrvVsPurchasesSummaryComponent, PurchasesReportGrvVsPurchasesDetailComponent, PurchasesReportByOrderNumberComponent, ReceivingReportByGrvNumberComponent]
})
export class PurchasesReportsContainerComponent {}
