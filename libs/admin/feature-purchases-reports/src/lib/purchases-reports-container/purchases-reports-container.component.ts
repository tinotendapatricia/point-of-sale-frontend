import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PurchasesReportByOrderNumberComponent } from '../purchases-report-by-order-number/purchases-report-by-order-number.component';
import { PurchasesReportGrvVsPurchasesDetailComponent } from '../purchases-report-grv-vs-purchases-detail/purchases-report-grv-vs-purchases-detail.component';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from '../purchases-report-grv-vs-purchases-summary/purchases-report-grv-vs-purchases-summary.component';
import { ReceivingReportByGrvNumberComponent } from '../receiving-report-by-grv-number/receiving-report-by-grv-number.component';

@Component({
  selector: 'pos-frontend-purchases-reports-container',
  templateUrl: './purchases-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    PurchasesReportGrvVsPurchasesSummaryComponent,
    PurchasesReportGrvVsPurchasesDetailComponent,
    PurchasesReportByOrderNumberComponent,
    ReceivingReportByGrvNumberComponent,
  ],
})
export class PurchasesReportsContainerComponent {}
