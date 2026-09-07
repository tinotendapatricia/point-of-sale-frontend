import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { Utilities } from '@pos-frontend/shared/utils';
import { LicenseFormComponent } from '@pos-frontend/company-details/ui';

@Component({
    selector: 'pos-frontend-license-system',
    templateUrl: './license-system.component.html',
    styleUrls: ['./license-system.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [LicenseFormComponent]
})
export class LicenseSystemComponent {
  private readonly dialogRef = inject(MatDialogRef<LicenseSystemComponent, boolean>);
  private readonly companyService = inject(CompanyService);

  readonly submitting = signal(false);

  license(licenseDetails: any): void {
    this.submitting.set(true);
    this.companyService.licenseSystem(licenseDetails).subscribe({
      next: () => {
        this.submitting.set(false);
        Utilities.displayToast('info', 'License applied thank you for licensing the system');
        this.dialogRef.close(true);
      },
      error: () => this.submitting.set(false),
    });
  }
}
