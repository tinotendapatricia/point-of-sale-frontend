import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockTakeContainerComponent } from './stock-take-container/stock-take-container.component';
import { StockTakeDataAccessModule } from '@pos-frontend/stock-take/data-access';
import { StockTakeUiModule } from '@pos-frontend/stock-take/ui';
import { ProductsDataAccessModule } from '@pos-frontend/products/data-access';
import { SharedUiModule } from '@pos-frontend/shared/ui';
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
    StockTakeUiModule,
    StockTakeDataAccessModule,
    ProductsDataAccessModule,
    SharedUiModule,
    ClarityModule,
  ],
  declarations: [
    StockTakeContainerComponent,
    CloseBatchComponent,
    CreateStockBatchComponent,
    StockTakeComponent,
    StockAdjustmentComponent

  ],
  exports: [CloseBatchComponent, CreateStockBatchComponent, StockTakeComponent],
})
export class AdminFeatureStockTakeModule {}
