import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsUiComponent } from '@pos-frontend/company-details/ui';
import { DrawerService } from '@pos-frontend/core';
import { CreateCompanyDetailsComponent } from '../create-company-details/create-company-details.component';
import {
  type UpdateCompanyDetailsData,
  UpdateCompanyDetailsComponent,
} from '../update-company-details/update-company-details.component';

@Component({
  selector: 'pos-frontend-company-details',
  templateUrl: './company-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatCard, MatCardContent, MatIconModule, CompanyDetailsUiComponent],
})
export class CompanyDetailsComponent {
  private readonly drawer = inject(DrawerService);
  private readonly injector = inject(Injector);
  protected readonly companyStore = inject(CompanyStore);

  protected readonly company = this.companyStore.company;
  protected readonly loading = this.companyStore.getOneLoading;

  constructor() {
    this.refresh();
  }

  protected refresh(): void {
    this.companyStore.getCompany();
  }

  protected create(): void {
    this.drawer
      .open<CreateCompanyDetailsComponent, boolean>(CreateCompanyDetailsComponent, {
        title: 'New Company',
        size: 'md',
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.refresh();
        }
      });
  }

  protected update(): void {
    const company = this.company();
    if (!company) {
      return;
    }
    this.drawer
      .open<UpdateCompanyDetailsComponent, boolean, UpdateCompanyDetailsData>(UpdateCompanyDetailsComponent, {
        title: 'Update Company',
        size: 'md',
        data: { company },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.refresh();
        }
      });
  }
}
