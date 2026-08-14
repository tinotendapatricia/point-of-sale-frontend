import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { AuthDataAccessModule } from '@pos-frontend/auth/data-access';
import { AuthUiModule } from '@pos-frontend/auth/ui';
import { ConfigureStationComponent } from './configure-station/configure-station.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    AuthUiModule,
    AuthDataAccessModule,
    MatProgressBarModule,
    RouterModule.forChild([
      { path: 'login', component: CustomerLoginComponent },
    ]),
  ],
  declarations: [CustomerLoginComponent, ConfigureStationComponent],
})
export class ClientFeatureAuthModule {}
