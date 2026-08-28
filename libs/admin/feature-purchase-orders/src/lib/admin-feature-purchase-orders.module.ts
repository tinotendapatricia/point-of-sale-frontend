import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PurchaseOrdersDataAccessModule } from '@pos-frontend/purchase-orders/data-access';

import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { VatDataAccessModule } from '@pos-frontend/vat/data-access';
import { CreditorsDataAccessModule } from '@pos-frontend/creditors/data-access';

@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    MatCardModule,
    PurchaseOrdersDataAccessModule,
    ProductsDataAccessModule,
    VatDataAccessModule,
    CreditorsDataAccessModule,
    RouterModule.forChild([
        { path: '', component: CreatePurchaseOrderComponent },
    ]),
    CreatePurchaseOrderComponent,
],
})
export class AdminFeaturePurchaseOrdersModule {}
