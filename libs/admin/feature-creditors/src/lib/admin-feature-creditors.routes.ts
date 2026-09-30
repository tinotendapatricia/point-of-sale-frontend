import { type Routes } from '@angular/router';

import { ListCreditorsComponent } from './list-creditors/list-creditors.component';

// CreditorStore is a root-provided signal store: no route-level providers needed.
export const ADMIN_FEATURE_CREDITORS_ROUTES: Routes = [{ path: '', component: ListCreditorsComponent }];
