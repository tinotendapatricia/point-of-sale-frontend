import { Routes } from '@angular/router';
import { LoginFeatureComponent } from './login-feature/login-feature.component';
import { provideAuthDataAccess } from '@pos-frontend/auth/data-access';
import '@cds/core/icon/register.js';
import { ClarityIcons, keyIcon } from '@cds/core/icon';

ClarityIcons.addIcons(keyIcon);

export const ADMIN_FEATURE_AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginFeatureComponent,
    providers: [provideAuthDataAccess()],
  },
];
