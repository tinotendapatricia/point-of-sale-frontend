import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGrvComponent } from './create-grv/create-grv.component';
import { GoodsReceivedDataAccessModule } from '@pos-frontend/goods-received/data-access';
import { GoodsReceivedUiModule } from '@pos-frontend/goods-received/ui';
import { ClarityModule } from '@clr/angular';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PurchaseOrdersDataAccessModule } from '@pos-frontend/purchase-orders/data-access';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    GoodsReceivedDataAccessModule,
    GoodsReceivedUiModule,
    PurchaseOrdersDataAccessModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: CreateGrvComponent }]),
  ],
  declarations: [CreateGrvComponent],
})
export class AdminFeatureGoodsReceivedModule {}
