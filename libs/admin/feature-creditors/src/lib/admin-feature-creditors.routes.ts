import { Routes } from '@angular/router';
import { ListCreditorsComponent } from './list-creditors/list-creditors.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';
import { provideCreditorsDataAccess } from '@pos-frontend/creditors/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_CREDITORS_ROUTES: Routes = [
  {
    path: '',
    component: ListCreditorsComponent,
    providers: [provideCreditorsDataAccess()],
  },
];
