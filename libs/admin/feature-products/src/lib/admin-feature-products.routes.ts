import { type Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { BreakBulkToSingleComponent } from './break-bulk-to-single/break-bulk-to-single.component';

// ProductStore and CurrencyStore are root-provided signal stores — no
// route-level providers needed anymore.
export const ADMIN_FEATURE_PRODUCTS_ROUTES: Routes = [
  { path: '', component: ListProductsComponent },
  { path: 'break-bulk', component: BreakBulkToSingleComponent },
];
