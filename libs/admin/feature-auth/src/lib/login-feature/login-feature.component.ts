import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';

import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { Subscription } from 'rxjs';
import { LoginFormComponent } from '../../../../../auth/ui/src/lib/login-form/login-form.component';
import { LicenseSystemComponent } from '../license-system/license-system.component';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';

@Component({
    selector: 'pos-frontend-login-feature',
    templateUrl: './login-feature.component.html',
    styleUrls: ['./login-feature.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LoginFormComponent, LicenseSystemComponent, ClrIcon, ClrIconModule]
})
export class LoginFeatureComponent implements OnDestroy, OnInit {
  isLicense = false;
  btnState$ = ClrLoadingState.DEFAULT;
  sub1 = new Subscription();
  sub2 = new Subscription();
  expiryDate: any;

  constructor(
    public authFacade: AuthenticationService,
    private router: Router,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getLicense();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  onSubmit(authDetails: any) {
    this.sub1 = this.authFacade.adminLogin(authDetails).subscribe({
      next: (res) => {
        sessionStorage.setItem('accessToken', res.token);
        sessionStorage.setItem('userId', res.userId);
        this.router.navigate(['']);
      },
    });
  }

  license(): void {
    this.isLicense = true;
  }

  getLicense() {
    this.sub2 = this.companyService.getCompany().subscribe({
      next: (res) => {
        sessionStorage.setItem('license', res?.license);
        this.expiryDate = res?.licenseExpDate
      },
    });
  }

  calDateDifference(date: string): number {
    const today = new Date();

    // Get the given date
    const givenDate = new Date(date);

    // Calculate the difference in days
    const timeDiff = Math.abs(givenDate.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }
}
