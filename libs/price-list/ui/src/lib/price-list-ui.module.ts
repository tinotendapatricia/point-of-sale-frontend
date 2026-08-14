import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListFormComponent } from './price-list-form/price-list-form.component';

import { ViewPriceListComponent } from './view-price-list/view-price-list.component';

import { AddProductToPriceListFormComponent } from './add-product-to-price-list-form/add-product-to-price-list-form.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule,ReactiveFormsModule],
  declarations: [
    PriceListFormComponent,
    ViewPriceListComponent,
    AddProductToPriceListFormComponent,
  ],
  exports: [
    PriceListFormComponent,
    ViewPriceListComponent,
    AddProductToPriceListFormComponent,
  ],
})
export class PriceListUiModule {}
