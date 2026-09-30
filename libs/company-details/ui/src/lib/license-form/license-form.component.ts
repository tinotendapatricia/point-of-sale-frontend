import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { LicenseSystemRequest } from '@pos-frontend/company-details/data-access';

/** What the form emits: the license key. The container adds the company id. */
export type LicenseFormValue = Pick<LicenseSystemRequest, 'license'>;

@Component({
  selector: 'pos-frontend-license-form',
  templateUrl: './license-form.component.html',
  styleUrl: './license-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class LicenseFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly loading = input(false);
  readonly title = input('');
  /** Shown as "Active Until": the current license expiry date, if known. */
  readonly activeUntil = input('');
  readonly submitLabel = input('OK');

  readonly submitted = output<LicenseFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    license: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
