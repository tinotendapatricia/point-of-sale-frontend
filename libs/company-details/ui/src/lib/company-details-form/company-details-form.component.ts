import { Component, ChangeDetectionStrategy, inject, input, output, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompanyEntity } from '@pos-frontend/company-details/data-access';

@Component({
    selector: 'pos-frontend-company-details-form',
    templateUrl: './company-details-form.component.html',
    styleUrls: ['./company-details-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule]
})
export class CompanyDetailsFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<unknown>, { optional: true });

  readonly company = input<CompanyEntity>();
  readonly loading = input(false);
  readonly title = input('');
  readonly btnTitle = input('Submit');
  readonly formValue = output<any>();

  readonly companyForm = this.formBuilder.group({
    name: [''],
    address: [''],
    bpNumber: [''],
    tinNumber: [''],
    email: [''],
    phone: [''],
    id: [''],
  });

  constructor() {
    effect(() => {
      const company = this.company();
      if (company) {
        this.companyForm.patchValue({ ...company, id: String(company.id) });
      }
    });
  }

  cancel() {
    this.dialogRef?.close(false);
  }

  submit() {
    this.formValue.emit(this.companyForm.value);
  }
}
