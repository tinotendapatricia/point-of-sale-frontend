import { type Routes } from '@angular/router';

import { ViewVatComponent } from './view-vat/view-vat.component';

// VatStore is a root-provided signal store: no route-level providers needed.
export const ADMIN_FEATURE_VAT_ROUTES: Routes = [{ path: '', component: ViewVatComponent }];
