import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AllSalesReportsComponent } from '../all--sales-reports/all--sales-reports.component';
import { GenerateGpReportComponent } from '../generate-gp-report/generate-gp-report.component';
import { SalesByDebtorComponent } from '../sales-by-debtor/sales-by-debtor.component';
import { SalesByPeriodAndProductComponent } from '../sales-by-period-and-product/sales-by-period-and-product.component';
import { SalesReportDetailedComponent } from '../sales-report-detailed/sales-report-detailed.component';
import { TillCashupReportComponent } from '../till-cashup-report/till-cashup-report.component';
import { TopSellingProductsForPeriodComponent } from '../top-selling-products-for-period/top-selling-products-for-period.component';

@Component({
  selector: 'pos-frontend-sales-reports-container',
  templateUrl: './sales-reports-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    AllSalesReportsComponent,
    SalesReportDetailedComponent,
    SalesByPeriodAndProductComponent,
    SalesByDebtorComponent,
    TopSellingProductsForPeriodComponent,
    TillCashupReportComponent,
    GenerateGpReportComponent,
  ],
})
export class SalesReportsContainerComponent {}
