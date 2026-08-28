import { Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { provideAuthDataAccess } from '@pos-frontend/auth/data-access';

export const CLIENT_FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: CustomerLoginComponent,
    providers: [provideAuthDataAccess()],
  },
];
