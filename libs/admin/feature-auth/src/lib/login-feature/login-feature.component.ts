import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AuthStore, type LoginCredentials } from '@pos-frontend/auth/data-access';
import { LoginFormComponent } from '@pos-frontend/auth/ui';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { LicenseSystemComponent } from '../license-system/license-system.component';

const DAY_MS = 1000 * 3600 * 24;

@Component({
  selector: 'pos-frontend-login-feature',
  templateUrl: './login-feature.component.html',
  styleUrl: './login-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, MatButtonModule, MatIconModule],
})
export class LoginFeatureComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly authStore = inject(AuthStore);
  private readonly companyStore = inject(CompanyStore);

  protected readonly submitting = this.authStore.loginLoading;
  protected readonly expiryDate = computed(() => this.companyStore.company()?.licenseExpDate);

  /** Whole days between today and the license expiry date (NaN while unknown). */
  protected readonly daysRemaining = computed(() => {
    const date = this.expiryDate();
    if (!date) {
      return NaN;
    }
    const timeDiff = Math.abs(new Date(date).getTime() - Date.now());
    return Math.ceil(timeDiff / DAY_MS);
  });

  protected readonly expiringSoon = computed(
    () => this.daysRemaining() >= 1 && this.daysRemaining() <= 8
  );
  protected readonly expired = computed(() => this.daysRemaining() <= 0);

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

  protected login(credentials: LoginCredentials): void {
    this.authStore.adminLogin({
      data: credentials,
      callback: () => void this.router.navigate(['']),
    });
  }

  protected license(): void {
    this.dialog.open(LicenseSystemComponent, { width: '420px' });
  }
}
