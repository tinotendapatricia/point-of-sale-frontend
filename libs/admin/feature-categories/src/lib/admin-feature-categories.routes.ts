import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { provideRolesDataAccess } from '@pos-frontend/roles/data-access';
import { provideCategoriesDataAccess } from '@pos-frontend/categories/data-access';

export const ADMIN_FEATURE_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    providers: [provideCategoriesDataAccess(), provideRolesDataAccess()],
  },
];
