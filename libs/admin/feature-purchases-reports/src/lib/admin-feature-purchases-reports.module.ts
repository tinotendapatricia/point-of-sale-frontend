import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesReportsContainerComponent } from './purchases-reports-container/purchases-reports-container.component';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from './purchases-report-grv-vs-purchases-summary/purchases-report-grv-vs-purchases-summary.component';
import { PurchasesReportGrvVsPurchasesDetailComponent } from './purchases-report-grv-vs-purchases-detail/purchases-report-grv-vs-purchases-detail.component';



import { ClarityModule } from '@clr/angular';
import { PurchasesReportByOrderNumberComponent } from './purchases-report-by-order-number/purchases-report-by-order-number.component';
import { ReceivingReportByGrvNumberComponent } from './receiving-report-by-grv-number/receiving-report-by-grv-number.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild([
        { path: '', component: PurchasesReportsContainerComponent }
    ]),
    PurchasesReportsContainerComponent,
    PurchasesReportsContainerComponent,
    PurchasesReportGrvVsPurchasesSummaryComponent,
    PurchasesReportGrvVsPurchasesDetailComponent,
    PurchasesReportByOrderNumberComponent,
    ReceivingReportByGrvNumberComponent
],
})
export class AdminFeaturePurchasesReportsModule {}
