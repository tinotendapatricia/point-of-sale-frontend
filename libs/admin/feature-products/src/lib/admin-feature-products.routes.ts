import { Routes } from '@angular/router';
import { ListProductsComponent } from './list-products/list-products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { BreakBulkToSingleComponent } from './break-bulk-to-single/break-bulk-to-single.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';
import { provideProductsDataAccess } from '@pos-frontend/products/data-access';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

const providers = [provideProductsDataAccess(), provideCurrenciesDataAccess()];

export const ADMIN_FEATURE_PRODUCTS_ROUTES: Routes = [
  { path: '', component: ListProductsComponent, providers },
  { path: 'new', component: CreateProductComponent, providers },
  { path: 'update/:productId', component: UpdateProductComponent, providers },
  { path: 'break-bulk', component: BreakBulkToSingleComponent, providers },
];
