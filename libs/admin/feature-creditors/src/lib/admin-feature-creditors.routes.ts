import { Routes } from '@angular/router';
import { ListCreditorsComponent } from './list-creditors/list-creditors.component';
import { provideCreditorsDataAccess } from '@pos-frontend/creditors/data-access';

export const ADMIN_FEATURE_CREDITORS_ROUTES: Routes = [
  {
    path: '',
    component: ListCreditorsComponent,
    providers: [provideCreditorsDataAccess()],
  },
];
