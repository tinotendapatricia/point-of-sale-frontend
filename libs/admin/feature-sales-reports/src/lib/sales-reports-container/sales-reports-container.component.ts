import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective } from '@clr/angular/popover/common';
import { ClrTabsModule } from '@clr/angular/layout/tabs';
import { ClrIfActive } from '@clr/angular/utils';
import { AllSalesReportsComponent } from '../all--sales-reports/all--sales-reports.component';
import { SalesReportDetailedComponent } from '../sales-report-detailed/sales-report-detailed.component';
import { SalesByPeriodAndProductComponent } from '../sales-by-period-and-product/sales-by-period-and-product.component';
import { SalesByDebtorComponent } from '../sales-by-debtor/sales-by-debtor.component';
import { TopSellingProductsForPeriodComponent } from '../top-selling-products-for-period/top-selling-products-for-period.component';
import { TillCashupReportComponent } from '../till-cashup-report/till-cashup-report.component';
import { GenerateGpReportComponent } from '../generate-gp-report/generate-gp-report.component';

@Component({
    selector: 'pos-frontend-sales-reports-container',
    templateUrl: './sales-reports-container.component.html',
    styleUrls: ['./sales-reports-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrTabsModule, ClrIfActive, AllSalesReportsComponent, SalesReportDetailedComponent, SalesByPeriodAndProductComponent, SalesByDebtorComponent, TopSellingProductsForPeriodComponent, TillCashupReportComponent, GenerateGpReportComponent]
})
export class SalesReportsContainerComponent {}
