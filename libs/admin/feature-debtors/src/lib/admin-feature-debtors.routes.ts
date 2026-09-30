import { type Routes } from '@angular/router';

import { ListDebtorsComponent } from './list-debtors/list-debtors.component';

// DebtorStore and CurrencyStore are root-provided signal stores: no route-level providers needed.
export const ADMIN_FEATURE_DEBTORS_ROUTES: Routes = [{ path: '', component: ListDebtorsComponent }];
