import { Routes } from '@angular/router';
import { PortalContainerComponent } from './portal-container/portal-container.component';
import { AuthGuard, provideAuthDataAccess } from '@pos-frontend/auth/data-access';
import '@cds/core/icon/register.js';
import {
  blocksGroupIcon,
  calendarIcon,
  ClarityIcons,
  fileIcon,
  formIcon,
  gridViewIcon,
  homeIcon,
  libraryIcon,
  sliderIcon,
  userIcon,
  usersIcon,
} from '@cds/core/icon';
import { provideUsersDataAccess } from '@pos-frontend/users/data-access';

ClarityIcons.addIcons(
  userIcon,
  homeIcon,
  fileIcon,
  formIcon,
  gridViewIcon,
  usersIcon,
  calendarIcon,
  libraryIcon,
  sliderIcon,
  blocksGroupIcon
);

const shellProviders = [provideAuthDataAccess(), provideUsersDataAccess()];

export const CLIENT_FEATURE_SHELL_ROUTES: Routes = [
  {
    path: 'auth',
    providers: shellProviders,
    loadChildren: () =>
      import('@pos-frontend/client/feature-auth').then(
        (module) => module.CLIENT_FEATURE_AUTH_ROUTES
      ),
  },
  {
    path: '',
    component: PortalContainerComponent,
    canActivate: [AuthGuard],
    providers: shellProviders,
    children: [
      { path: '', redirectTo: 'pos', pathMatch: 'full' },
      {
        path: 'pos',
        loadChildren: () =>
          import('@pos-frontend/client/feature-pos').then(
            (module) => module.CLIENT_FEATURE_POS_ROUTES
          ),
      },
      {
        path: 'refund',
        loadChildren: () =>
          import('@pos-frontend/client/feature-refund').then(
            (module) => module.CLIENT_FEATURE_REFUND_ROUTES
          ),
      },
    ],
  },
];
