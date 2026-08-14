import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportsContainerComponent } from './sales-reports-container/sales-reports-container.component';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { AllSalesReportsComponent } from './all--sales-reports/all--sales-reports.component';
import { ReportsDataAccessModule } from '@pos-frontend/reports/data-access';
import { ReportsUiModule } from '@pos-frontend/reports/ui';
import { SalesByDebtorComponent } from './sales-by-debtor/sales-by-debtor.component';
import { DebtorsDataAccessModule } from '@pos-frontend/debtors/data-access';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';
import { SalesByPeriodAndProductComponent } from './sales-by-period-and-product/sales-by-period-and-product.component';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { TillCashupReportComponent } from './till-cashup-report/till-cashup-report.component';
import { GenerateGpReportComponent } from './generate-gp-report/generate-gp-report.component';
import { SalesReportDetailedComponent } from './/sales-report-detailed/sales-report-detailed.component';
import { SalesByStationComponent } from './sales-by-station/sales-by-station.component';
import { TopSellingProductsForPeriodComponent } from './top-selling-products-for-period/top-selling-products-for-period.component';
@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReportsDataAccessModule,
    ReportsUiModule,
    DebtorsDataAccessModule,
    CurrenciesDataAccessModule,
    ProductsDataAccessModule,
    DebtorsDataAccessModule,

    RouterModule.forChild([
      { path: '', component: SalesReportsContainerComponent },
    ]),
  ],
  declarations: [
    SalesReportsContainerComponent,
    AllSalesReportsComponent,
    SalesByDebtorComponent,
    SalesByPeriodAndProductComponent,
    TillCashupReportComponent,
    GenerateGpReportComponent,
    SalesReportDetailedComponent,
    SalesByStationComponent,
    TopSellingProductsForPeriodComponent,
  ],
  exports: [
    SalesByPeriodAndProductComponent,
    GenerateGpReportComponent,
    SalesByStationComponent,
  ],
})
export class AdminFeatureSalesReportsModule {}
