import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyEntity, CompanyService } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent } from '@pos-frontend/company-details/ui';

export interface UpdateCompanyDetailsData {
  company: CompanyEntity;
}

@Component({
    selector: 'pos-frontend-update-company-details',
    templateUrl: './update-company-details.component.html',
    styleUrls: ['./update-company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CompanyDetailsFormComponent]
})
export class UpdateCompanyDetailsComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateCompanyDetailsComponent, boolean>);
  private readonly companyService = inject(CompanyService);
  private readonly data = inject<UpdateCompanyDetailsData>(MAT_DIALOG_DATA);

  readonly company = this.data.company;
  readonly submitting = signal(false);

  public createCompany(company: any) {
    this.submitting.set(true);
    this.companyService.updateCompany(company).subscribe({
      next: () => {
        this.submitting.set(false);
        this.dialogRef.close(true);
      },
      error: () => this.submitting.set(false),
    });
  }
}
