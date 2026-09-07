import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent } from '@pos-frontend/company-details/ui';

@Component({
    selector: 'pos-frontend-create-company-details',
    templateUrl: './create-company-details.component.html',
    styleUrls: ['./create-company-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CompanyDetailsFormComponent]
})
export class CreateCompanyDetailsComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateCompanyDetailsComponent, boolean>);
  private readonly companyService = inject(CompanyService);

  readonly submitting = signal(false);

  public createCompany(company: any) {
    this.submitting.set(true);
    this.companyService.createCompany(company).subscribe({
      next: () => {
        this.submitting.set(false);
        this.dialogRef.close(true);
      },
      error: () => this.submitting.set(false),
    });
  }
}
