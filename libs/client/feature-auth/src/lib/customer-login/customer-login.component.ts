import { Component, ChangeDetectionStrategy, Injector, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClrLoadingState } from '@clr/angular';

import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { LoginFormComponent } from '@pos-frontend/auth/ui';
import { ConfigureStationComponent } from '../configure-station/configure-station.component';

@Component({
    selector: 'pos-frontend-customer-login',
    templateUrl: './customer-login.component.html',
    styleUrls: ['./customer-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LoginFormComponent]
})
export class CustomerLoginComponent {
  private readonly injector = inject(Injector);
  private readonly dialog = inject(MatDialog);
  private readonly configService = inject(ConfigurationsService);
  private readonly companyService = inject(CompanyService);
  readonly authFacade = inject(AuthFacade);

  readonly loading = toSignal(
    this.authFacade.authBtnState$.pipe(map((state) => state === ClrLoadingState.LOADING)),
    { initialValue: false }
  );
  readonly expiryDate = signal<string | undefined>(undefined);
  readonly errMessage = signal(false);

  constructor() {
    this.getLicense();
  }

  onSubmit(authDetails: any) {
    this.configService.getAllConfigurations().subscribe({
      next: (res) => {
        const station = res.findIndex(
          (station) =>
            station.stationNumber.toString() === localStorage.getItem('station')
        );
        if (station >= 0) {
          this.authFacade.adminLogin(authDetails);
        } else {
          sessionStorage.clear();
          this.authFacade.logout();
          Utilities.displayToast('error', 'Station Number ConfigurationError');
        }
      },
      error: () => {},
    });
  }

  getLicense() {
    this.companyService.getCompany().subscribe({
      next: (res) => {
        sessionStorage.setItem('license', res?.license);
        this.expiryDate.set(res?.licenseExpDate);
        this.calDateDifference(res?.licenseExpDate);
      },
    });
  }

  calDateDifference(date: string) {
    const today = new Date();
    const givenDate = new Date(date);
    this.errMessage.set(givenDate < today);
  }

  configureStation() {
    this.dialog.open(ConfigureStationComponent, { width: '360px', injector: this.injector });
  }
}
