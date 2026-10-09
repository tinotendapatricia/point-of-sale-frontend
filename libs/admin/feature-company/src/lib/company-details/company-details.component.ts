import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CompanyStore } from '@pos-frontend/company-details/data-access';

import {
  type CreateCompanyDetailsData,
  CreateCompanyDetailsComponent,
} from '../create-company-details/create-company-details.component';

@Component({
  selector: 'pos-frontend-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class CompanyDetailsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly companyStore = inject(CompanyStore);

  protected readonly company = this.companyStore.company;
  protected readonly loading = this.companyStore.getOneLoading;

  protected readonly rows = computed(() => {
    const company = this.company();
    return [
      { label: 'Name', value: company?.name },
      { label: 'Email', value: company?.email },
      { label: 'BP Number', value: company?.bpNumber },
      { label: 'TIN Number', value: company?.tinNumber },
      { label: 'Phone Number(s)', value: company?.phone },
      { label: 'Address', value: company?.address },
    ];
  });

  constructor() {
    this.refresh();
  }

  protected refresh(): void {
    this.companyStore.getCompany();
  }

  /** Opens the company dialog: update when a record exists, create otherwise. */
  protected edit(): void {
    const company = this.company();
    this.dialog
      .open<CreateCompanyDetailsComponent, CreateCompanyDetailsData, boolean>(CreateCompanyDetailsComponent, {
        width: '560px',
        data: company ? { company } : {},
      })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.refresh();
        }
      });
  }
}
