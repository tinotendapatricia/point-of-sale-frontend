import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { type CompanyEntity, CompanyStore } from '@pos-frontend/company-details/data-access';
import { DialogHeaderComponent } from '@pos-frontend/shared/ui';

export interface CreateCompanyDetailsData {
  /** Present when editing the existing company; omit to create it. */
  company?: CompanyEntity;
}

/** Create/update dialog: opened through MatDialog from the company details page. */
@Component({
  selector: 'pos-frontend-create-company-details',
  templateUrl: './create-company-details.component.html',
  styleUrl: './create-company-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    DialogHeaderComponent,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class CreateCompanyDetailsComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dialogRef = inject<MatDialogRef<CreateCompanyDetailsComponent, boolean>>(MatDialogRef);
  private readonly data = inject<CreateCompanyDetailsData | null>(MAT_DIALOG_DATA, { optional: true });
  private readonly companyStore = inject(CompanyStore);

  protected readonly company = this.data?.company;
  protected readonly title = this.company ? 'Update Company' : 'New Company';
  protected readonly submitLabel = this.company ? 'Update' : 'Create';
  protected readonly loading = computed(() =>
    this.company ? this.companyStore.updateLoading() : this.companyStore.createLoading(),
  );

  protected readonly form = this.fb.group({
    name: [this.company?.name ?? '', Validators.required],
    address: [this.company?.address ?? ''],
    bpNumber: [this.company?.bpNumber ?? '', Validators.required],
    tinNumber: [this.company?.tinNumber ?? '', Validators.required],
    email: [this.company?.email ?? '', [Validators.required, Validators.email]],
    phone: [this.company?.phone ?? '', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const callback = () => this.dialogRef.close(true);

    if (this.company) {
      this.companyStore.updateCompany({ data: { ...value, id: this.company.id }, callback });
    } else {
      this.companyStore.createCompany({ data: value, callback });
    }
  }
}
