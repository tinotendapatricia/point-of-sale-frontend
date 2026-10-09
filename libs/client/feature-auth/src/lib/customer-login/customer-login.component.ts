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
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { getStationNumber } from '@pos-frontend/pos/data-access';
import { ConfigureStationComponent } from '../configure-station/configure-station.component';

const DAY_MS = 1000 * 3600 * 24;

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
  private readonly authStore = inject(AuthStore);
  private readonly companyStore = inject(CompanyStore);
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly station = signal(getStationNumber());
  protected readonly loading = computed(
    () =>
      this.authStore.loginLoading() || this.configurationStore.getManyLoading()
  );

  /** Only a till whose station number is configured may log in. */
  private readonly knownStation = computed(() =>
    this.configurationStore
      .configurations()
      .some((config) => String(config.stationNumber) === this.station())
  );

  protected readonly expiryDate = computed(
    () => this.companyStore.company()?.licenseExpDate
  );

  /** Whole days until the license expires (NaN while unknown, negative once expired). */
  protected readonly daysRemaining = computed(() => {
    const date = this.expiryDate();
    return date ? Math.ceil((new Date(date).getTime() - Date.now()) / DAY_MS) : NaN;
  });

  protected readonly expired = computed(() => this.daysRemaining() <= 0);
  protected readonly expiringSoon = computed(
    () => this.daysRemaining() >= 1 && this.daysRemaining() <= 8
  );

  constructor() {
    this.companyStore.getCompany();
    this.configurationStore.getAllConfigurations();

    // The license interceptor reads the license key from the session.
    effect(() => {
      const license = this.companyStore.company()?.license;
      if (license) {
        sessionStorage.setItem('license', license);
      }
    });
  }

  protected login(credentials: LoginCredentials): void {
    if (!this.knownStation()) {
      this.authStore.logout();
      this.toast.error('This till station is not configured');
      return;
    }
    this.authStore.adminLogin({
      data: credentials,
      callback: () => void this.router.navigate(['']),
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
