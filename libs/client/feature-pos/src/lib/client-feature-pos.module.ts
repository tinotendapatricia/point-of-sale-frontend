import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { DebtorsDataAccessModule } from '@pos-frontend/debtors/data-access';
import { VatDataAccessModule } from '@pos-frontend/vat/data-access';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';
import { PosDataAccessModule } from '@pos-frontend/pos/data-access';
import { PrintReceiptComponent } from './print-receipt/print-receipt.component';
@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    ProductsDataAccessModule,
    DebtorsDataAccessModule,
    VatDataAccessModule,
    CurrenciesDataAccessModule,
    PosDataAccessModule,
    RouterModule.forChild([{ path: '', component: PosHomeComponent }]),
    PosHomeComponent, PrintReceiptComponent,
],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ClientFeaturePosModule {}
