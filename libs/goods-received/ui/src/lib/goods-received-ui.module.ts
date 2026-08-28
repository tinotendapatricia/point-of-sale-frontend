import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrvFormComponent } from './grv-form/grv-form.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';

@NgModule({
    imports: [CommonModule, NgSelectModule, ClarityModule, ReactiveFormsModule, FormsModule, ProductsDataAccessModule, GrvFormComponent],
    exports: [GrvFormComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class GoodsReceivedUiModule {}
