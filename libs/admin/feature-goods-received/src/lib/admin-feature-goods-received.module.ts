import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGrvComponent } from './create-grv/create-grv.component';

import { GoodsReceivedUiModule } from '@pos-frontend/goods-received/ui';
import { ClarityModule } from '@clr/angular';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PurchaseOrdersDataAccessModule } from '@pos-frontend/purchase-orders/data-access';

@NgModule({
    imports: [
    CommonModule,
    ClarityModule,
    GoodsReceivedUiModule,
    PurchaseOrdersDataAccessModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: CreateGrvComponent }]),
    CreateGrvComponent,
],
})
export class AdminFeatureGoodsReceivedModule {}
