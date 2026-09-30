import { type Routes } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component';

export const ADMIN_FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginFeatureComponent,
  },
];
