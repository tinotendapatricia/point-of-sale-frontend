import { Routes } from '@angular/router';
import { ViewVatComponent } from './view-vat/view-vat.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';
import { provideVatDataAccess } from '@pos-frontend/vat/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_VAT_ROUTES: Routes = [
  {
    path: '',
    component: ViewVatComponent,
    providers: [provideVatDataAccess()],
  },
];
