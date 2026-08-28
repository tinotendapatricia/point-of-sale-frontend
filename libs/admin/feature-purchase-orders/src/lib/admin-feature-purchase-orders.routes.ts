import { Routes } from '@angular/router';
import { CreatePurchaseOrderComponent } from './create-purchase-order/create-purchase-order.component';
import { providePurchaseOrdersDataAccess } from '@pos-frontend/purchase-orders/data-access';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';
import { provideVatDataAccess } from '@pos-frontend/vat/data-access';
import { provideCreditorsDataAccess } from '@pos-frontend/creditors/data-access';

export const ADMIN_FEATURE_PURCHASE_ORDERS_ROUTES: Routes = [
  {
    path: '',
    component: CreatePurchaseOrderComponent,
    providers: [
      providePurchaseOrdersDataAccess(),
      provideProductsDataAccess(),
      provideVatDataAccess(),
      provideCreditorsDataAccess(),
    ],
  },
];
