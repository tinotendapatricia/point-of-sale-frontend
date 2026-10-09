import { type Routes } from '@angular/router';
import { PortalContainerComponent } from './portal-container/portal-container.component';
import { authGuard } from '@pos-frontend/auth/data-access';

export const CLIENT_FEATURE_SHELL_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@pos-frontend/client/feature-auth').then(
        (module) => module.CLIENT_FEATURE_AUTH_ROUTES
      ),
  },
  {
    path: '',
    component: PortalContainerComponent,
    canActivate: [authGuard],
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
