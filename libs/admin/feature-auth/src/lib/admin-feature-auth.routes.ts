import { Routes } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component';
import { provideAuthDataAccess } from '@pos-frontend/auth/data-access';

export const ADMIN_FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginFeatureComponent,
    providers: [provideAuthDataAccess()],
  },
];
