import { Routes } from '@angular/router';
import { CreateGrvComponent } from './create-grv/create-grv.component';
import { providePurchaseOrdersDataAccess } from '@pos-frontend/purchase-orders/data-access';

export const ADMIN_FEATURE_GOODS_RECEIVED_ROUTES: Routes = [
  {
    path: '',
    component: CreateGrvComponent,
    providers: [providePurchaseOrdersDataAccess()],
  },
];
