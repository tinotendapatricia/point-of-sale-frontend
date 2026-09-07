import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { LoginFormComponent } from '@pos-frontend/auth/ui';
import { LicenseSystemComponent } from '../license-system/license-system.component';

@Component({
    selector: 'pos-frontend-login-feature',
    templateUrl: './login-feature.component.html',
    styleUrls: ['./login-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LoginFormComponent, MatIconModule]
})
export class LoginFeatureComponent {
  private readonly router = inject(Router);
  private readonly companyService = inject(CompanyService);
  private readonly dialog = inject(MatDialog);
  readonly authFacade = inject(AuthenticationService);

  readonly submitting = signal(false);
  readonly expiryDate = signal<string | undefined>(undefined);

  constructor() {
    this.getLicense();
  }

  onSubmit(authDetails: any) {
    this.submitting.set(true);
    this.authFacade.adminLogin(authDetails).subscribe({
      next: (res) => {
        this.submitting.set(false);
        sessionStorage.setItem('accessToken', res.token);
        sessionStorage.setItem('userId', res.userId);
        this.router.navigate(['']);
      },
      error: () => this.submitting.set(false),
    });
  }

  license(): void {
    this.dialog.open(LicenseSystemComponent, { width: '420px' });
  }

  getLicense() {
    this.companyService.getCompany().subscribe({
      next: (res) => {
        sessionStorage.setItem('license', res?.license);
        this.expiryDate.set(res?.licenseExpDate);
      },
    });
  }

  calDateDifference(date: string | undefined): number {
    if (!date) {
      return NaN;
    }
    const today = new Date();
    const givenDate = new Date(date);
    const timeDiff = Math.abs(givenDate.getTime() - today.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
