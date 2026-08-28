import { Routes } from '@angular/router';
import { ListDebtorsComponent } from './list-debtors/list-debtors.component';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';
import { provideDebtorsDataAccess } from '@pos-frontend/debtors/data-access';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_DEBTORS_ROUTES: Routes = [
  {
    path: '',
    component: ListDebtorsComponent,
    providers: [provideDebtorsDataAccess(), provideCurrenciesDataAccess()],
  },
];
