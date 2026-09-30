import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import {
  LicenseFormComponent,
  type LicenseFormValue,
} from '@pos-frontend/company-details/ui';

@Component({
  selector: 'pos-frontend-license-system',
  templateUrl: './license-system.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LicenseFormComponent],
})
export class LicenseSystemComponent {
  private readonly dialogRef =
    inject<MatDialogRef<LicenseSystemComponent, boolean>>(MatDialogRef);
  private readonly companyStore = inject(CompanyStore);

  protected readonly submitting = this.companyStore.licenseLoading;
  protected readonly activeUntil = computed(
    () => this.companyStore.company()?.licenseExpDate ?? ''
  );

  protected license(value: LicenseFormValue): void {
    this.companyStore.licenseSystem({
      data: { ...value, id: this.companyStore.company()?.id ?? '' },
      callback: () => this.close(true),
    });
  }

  protected close(licensed: boolean): void {
    this.dialogRef.close(licensed);
  }
}
