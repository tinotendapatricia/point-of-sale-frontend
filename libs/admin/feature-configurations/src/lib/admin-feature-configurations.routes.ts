import { Routes } from '@angular/router';
import { ConfigurationsListComponent } from './configurations-list/configurations-list.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon, syncIcon);

export const ADMIN_FEATURE_CONFIGURATIONS_ROUTES: Routes = [
  { path: '', component: ConfigurationsListComponent },
];
