import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon } from '@cds/core/icon';
import { provideRolesDataAccess } from '@pos-frontend/roles/data-access';
import { provideCategoriesDataAccess } from '@pos-frontend/categories/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);

export const ADMIN_FEATURE_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    providers: [provideCategoriesDataAccess(), provideRolesDataAccess()],
  },
];
