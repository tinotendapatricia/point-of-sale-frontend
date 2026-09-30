import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { CompanyEntity, CompanyRequest } from '@pos-frontend/company-details/data-access';

/** What the form emits: only the fields the user edits, never id, license or audit fields. */
export type CompanyFormValue = CompanyRequest;

@Component({
  selector: 'pos-frontend-company-details-form',
  templateUrl: './company-details-form.component.html',
  styleUrl: './company-details-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class CompanyDetailsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly company = input<CompanyEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<CompanyFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    address: [''],
    bpNumber: ['', Validators.required],
    tinNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const company = this.company();
      if (company) {
        this.form.reset({
          name: company.name,
          address: company.address,
          bpNumber: company.bpNumber,
          tinNumber: company.tinNumber,
          email: company.email,
          phone: company.phone,
        });
      }
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
