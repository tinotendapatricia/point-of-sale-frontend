import { type Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login/customer-login.component';

export const CLIENT_FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: CustomerLoginComponent,
  },
];
