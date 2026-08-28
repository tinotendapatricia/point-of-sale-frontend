import { Routes } from '@angular/router';
import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { provideCurrenciesDataAccess } from '@pos-frontend/currencies/data-access';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_CURRENCIES_ROUTES: Routes = [
  {
    path: '',
    component: CurrenciesListComponent,
    providers: [provideCurrenciesDataAccess()],
  },
];
