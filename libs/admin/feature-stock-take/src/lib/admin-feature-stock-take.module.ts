import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockTakeContainerComponent } from './stock-take-container/stock-take-container.component';


import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';

import { CloseBatchComponent } from './close-batch/close-batch.component';
import { ClarityModule } from '@clr/angular';
import { CreateStockBatchComponent } from './create-stock-batch/create-stock-batch.component';
import { StockTakeComponent } from './stock-take/stock-take.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';


@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild([
        { path: '', component: StockTakeContainerComponent },
    ]),
    ProductsDataAccessModule,
    ClarityModule,
    StockTakeContainerComponent,
    CloseBatchComponent,
    CreateStockBatchComponent,
    StockTakeComponent,
    StockAdjustmentComponent,
],
    exports: [CloseBatchComponent, CreateStockBatchComponent, StockTakeComponent],
})
export class AdminFeatureStockTakeModule {}
