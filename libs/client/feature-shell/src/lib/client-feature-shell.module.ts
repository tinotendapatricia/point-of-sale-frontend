import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalContainerComponent } from './portal-container/portal-container.component';
import { RouterModule } from '@angular/router';
import { AuthDataAccessModule, AuthGuard } from '@pos-frontend/auth/data-access';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClarityModule } from '@clr/angular';
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
import { HeaderComponent } from './header/header.component';
import { SharedUiModule } from '@pos-frontend/shared/ui';
import { UsersDataAccessModule } from '@pos-frontend/users/data-access';
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
@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        ClarityModule,
        SharedUiModule,
        AuthDataAccessModule,
        UsersDataAccessModule,
        RouterModule.forChild([
            {
                path: 'auth',
                loadChildren: () => import('@pos-frontend/client/feature-auth').then((module) => module.ClientFeatureAuthModule),
            },
            {
                path: '',
                component: PortalContainerComponent,
                canActivate: [AuthGuard],
                //resolve: [UserProfileResolverService],
                children: [
                    { path: '', redirectTo: 'pos', pathMatch: 'full' },
                    {
                        path: 'pos',
                        loadChildren: () => import('@pos-frontend/client/feature-pos').then((module) => module.ClientFeaturePosModule),
                    },
                    {
                        path: 'refund',
                        loadChildren: () => import('@pos-frontend/client/feature-refund').then((module) => module.ClientFeatureRefundModule),
                    },
                ],
            },
        ]),
        PortalContainerComponent, HeaderComponent,
    ],
    exports: [HeaderComponent],
})
export class ClientFeatureShellModule {}
