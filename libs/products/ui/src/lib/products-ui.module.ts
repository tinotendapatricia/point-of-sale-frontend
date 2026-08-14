import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListUiComponent } from './products-list-ui/products-list-ui.component';
import { ProductsFormComponent } from './products-form/products-form.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  plusIcon,
  checkIcon,
} from '@cds/core/icon';
import { UpdateCostAndPriceComponent } from './update-cost-and-price/update-cost-and-price.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreakBulkFormComponent } from './break-bulk-form/break-bulk-form.component';


ClarityIcons.addIcons(plusCircleIcon, pencilIcon, checkIcon, plusIcon);

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, NgSelectModule],
  declarations: [
    ProductsListUiComponent,
    ProductsFormComponent,
    UpdateCostAndPriceComponent,
    BreakBulkFormComponent,
  ],
  exports: [ProductsFormComponent, ProductsListUiComponent, BreakBulkFormComponent,UpdateCostAndPriceComponent,
  NgSelectModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ProductsUiModule {}
