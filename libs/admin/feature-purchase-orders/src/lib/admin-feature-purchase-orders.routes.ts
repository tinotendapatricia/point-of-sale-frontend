import { type Routes } from '@angular/router';

import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';

export const ADMIN_FEATURE_PURCHASE_ORDERS_ROUTES: Routes = [
  { path: '', component: CreatePurchaseOrderComponent },
];
