import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';

import { ClarityModule } from '@clr/angular';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { CurrenciesDataAccessModule } from '@pos-frontend/currencies/data-access';
import { UpdateCostComponent } from './update-cost/update-cost.component';
import { UpdatePriceComponent } from './update-price/update-price.component';

import { UpdateProductComponent } from './update-product/update-product.component';
import { BreakBulkToSingleComponent } from './break-bulk-to-single/break-bulk-to-single.component';
ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

@NgModule({
    imports: [
    CommonModule,
    ProductsDataAccessModule,
    CurrenciesDataAccessModule,
    RouterModule.forChild([
        { path: '', component: ListProductsComponent },
        { path: 'new', component: CreateProductComponent },
        { path: 'update/:productId', component: UpdateProductComponent },
        { path: 'break-bulk', component: BreakBulkToSingleComponent },
    ]),
    ClarityModule,
    MatCardModule,
    ListProductsComponent,
    CreateProductComponent,
    UpdateCostComponent,
    UpdatePriceComponent,
    UpdatePriceComponent,
    UpdateProductComponent,
    UpdateProductComponent,
    BreakBulkToSingleComponent,
],
    exports: [
        ListProductsComponent,
        CreateProductComponent,
        UpdatePriceComponent,
        UpdateProductComponent,
        UpdateProductComponent,
    ],
})
export class AdminFeatureProductsModule {}
