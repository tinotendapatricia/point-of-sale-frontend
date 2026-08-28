import { Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_COMPANY_ROUTES: Routes = [
  { path: '', component: CompanyDetailsComponent },
];
