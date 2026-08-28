import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LowSellingProductComponent } from './low-selling-product/low-selling-product.component';
import { TopSellingProductComponent } from './top-selling-product/top-selling-product.component';
import { LowStockProductsComponent } from './low-stock-products/low-stock-products.component';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { ClarityModule } from '@clr/angular';
//import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }]),
        DashboardComponent,
        LowSellingProductComponent,
        TopSellingProductComponent,
        LowStockProductsComponent,
        RecentTransactionsComponent,
    ],
})
export class AdminFeatureDashboardModule {}
