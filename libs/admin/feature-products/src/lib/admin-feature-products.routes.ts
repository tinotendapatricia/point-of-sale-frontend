import { type Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { BreakBulkToSingleComponent } from './break-bulk-to-single/break-bulk-to-single.component';

// ProductStore and CurrencyStore are root-provided signal stores — no
// route-level providers needed anymore.
export const ADMIN_FEATURE_PRODUCTS_ROUTES: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'new', component: CreateProductComponent },
  { path: 'update/:productId', component: UpdateProductComponent },
  { path: 'break-bulk', component: BreakBulkToSingleComponent },
];
