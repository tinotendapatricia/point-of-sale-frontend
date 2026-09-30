import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthStore, type LoginCredentials } from '@pos-frontend/auth/data-access';
import { LoginFormComponent } from '@pos-frontend/auth/ui';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { ConfigurationService } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { getStationNumber } from '@pos-frontend/pos/data-access';
import { ConfigureStationComponent } from '../configure-station/configure-station.component';

@Component({
  selector: 'pos-frontend-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent],
})
export class CustomerLoginComponent {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  private readonly configService = inject(ConfigurationService);
  private readonly authStore = inject(AuthStore);
  private readonly companyStore = inject(CompanyStore);

  protected readonly loading = this.authStore.loginLoading;
  protected readonly station = signal(getStationNumber());
  protected readonly expiryDate = computed(
    () => this.companyStore.company()?.licenseExpDate
  );
  protected readonly expired = computed(() => {
    const date = this.expiryDate();
    return date ? new Date(date) < new Date() : false;
  });

  constructor() {
    this.companyStore.getCompany();

    // The license interceptor reads the license key from the session.
    effect(() => {
      const license = this.companyStore.company()?.license;
      if (license) {
        sessionStorage.setItem('license', license);
      }
    });
  }

  /** Only a till with a known station number may log in. */
  protected login(credentials: LoginCredentials): void {
    this.configService
      .getAllConfigurations()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((configurations) => {
        const station = getStationNumber();
        const known = configurations.some(
          (config) => config.stationNumber.toString() === station
        );
        if (known) {
          this.authStore.adminLogin({
            data: credentials,
            callback: () => void this.router.navigate(['']),
          });
        } else {
          this.authStore.logout();
          this.toast.error('Station Number ConfigurationError');
        }
      });
  }

  protected configureStation(): void {
    this.dialog
      .open<ConfigureStationComponent, unknown, boolean>(
        ConfigureStationComponent,
        { width: '360px', injector: this.injector }
      )
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((saved) => {
        if (saved) {
          this.station.set(getStationNumber());
        }
      });
  }
}
