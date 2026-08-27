import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pos-frontend-customer-login',
    templateUrl: './customer-login.component.html',
    styleUrls: ['./customer-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomerLoginComponent implements OnInit {
  sub2 = new Subscription();
  sub = new Subscription();

  isSetStation = false;
  expiryDate: any;
  daysRemaining!: number;
  errMessage = false;

  constructor(
    public authFacade: AuthFacade,
    private router: Router,
    public configService: ConfigurationsService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.getLicense();
  }

  onSubmit(authDetails: any) {
    this.sub = this.configService.getAllConfigurations().subscribe({
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
    this.sub2 = this.companyService.getCompany().subscribe({
      next: (res) => {
        sessionStorage.setItem('license', res?.license);
        this.expiryDate = res?.licenseExpDate;
        this.calDateDifference(res?.licenseExpDate);
      },
    });
  }

  calDateDifference(date: string) {
    const today = new Date();

    // Get the given date
    const givenDate = new Date(date);
    console.log(today);
    console.log(givenDate);

    if (givenDate < today) {
      this.errMessage = true;
    } else {
      this.errMessage = false;
    }
  }
}
