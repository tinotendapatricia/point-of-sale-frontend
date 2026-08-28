import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFeatureComponent } from './login-feature/login-feature.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthUiModule } from '@pos-frontend/auth/ui';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthDataAccessModule } from '@pos-frontend/auth/data-access';
import { CompanyDetailsDataAccessModule } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsUiModule } from '@pos-frontend/company-details/ui';
import { LicenseSystemComponent } from './license-system/license-system.component';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  keyIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

ClarityIcons.addIcons(keyIcon);

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        AuthUiModule,
        ClarityModule,
        AuthDataAccessModule,
        MatProgressBarModule,
        CompanyDetailsDataAccessModule,
        CompanyDetailsUiModule,
        RouterModule.forChild([
            { path: 'login', component: LoginFeatureComponent },
        ]),
        LoginFeatureComponent, LicenseSystemComponent,
    ],
})
export class AdminFeatureAuthModule {}
