import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from '../purchases-report-grv-vs-purchases-summary/purchases-report-grv-vs-purchases-summary.component';
import { PurchasesReportGrvVsPurchasesDetailComponent } from '../purchases-report-grv-vs-purchases-detail/purchases-report-grv-vs-purchases-detail.component';
import { PurchasesReportByOrderNumberComponent } from '../purchases-report-by-order-number/purchases-report-by-order-number.component';
import { ReceivingReportByGrvNumberComponent } from '../receiving-report-by-grv-number/receiving-report-by-grv-number.component';

@Component({
    selector: 'pos-frontend-purchases-reports-container',
    templateUrl: './purchases-reports-container.component.html',
    styleUrls: ['./purchases-reports-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatTabsModule, PurchasesReportGrvVsPurchasesSummaryComponent, PurchasesReportGrvVsPurchasesDetailComponent, PurchasesReportByOrderNumberComponent, ReceivingReportByGrvNumberComponent]
})
export class PurchasesReportsContainerComponent {}
