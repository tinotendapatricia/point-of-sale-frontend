import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { BreakBulkToSingleComponent } from './break-bulk-to-single/break-bulk-to-single.component';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';

// ProductStore is a root-provided signal store (see product.store.ts) — no
// route-level provider needed for it anymore, unlike CurrenciesFacade.
const providers = [provideCurrenciesDataAccess()];

export const ADMIN_FEATURE_PRODUCTS_ROUTES: Routes = [
  { path: '', component: ListProductsComponent, providers },
  { path: 'new', component: CreateProductComponent, providers },
  { path: 'update/:productId', component: UpdateProductComponent, providers },
  { path: 'break-bulk', component: BreakBulkToSingleComponent, providers },
];
