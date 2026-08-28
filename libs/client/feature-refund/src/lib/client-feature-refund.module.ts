import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefundHomeComponent } from './refund-home/refund-home.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';
import { DebtorsDataAccessModule } from '@pos-frontend/debtors/data-access';
import { PosDataAccessModule } from '@pos-frontend/pos/data-access';
import { PosUiModule } from '@pos-frontend/pos/ui';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { VatDataAccessModule } from '@pos-frontend/vat/data-access';


@NgModule({
    imports: [CommonModule,
        ClarityModule,
        PosUiModule,
        ProductsDataAccessModule,
        DebtorsDataAccessModule,
        VatDataAccessModule,
        CurrenciesDataAccessModule,
        PosDataAccessModule,
        RouterModule.forChild([{ path: '', component: RefundHomeComponent }]), RefundHomeComponent,],
})
export class ClientFeatureRefundModule {}
