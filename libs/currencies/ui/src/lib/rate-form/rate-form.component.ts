import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { UpdateRateRequest } from '@pos-frontend/currencies/data-access';

/** What the form emits; the container adds the currency id. */
export type RateFormValue = Pick<UpdateRateRequest, 'rate' | 'effectiveDate'>;

@Component({
  selector: 'pos-frontend-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrl: './rate-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class RateFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<RateFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    rate: [0, [Validators.required, Validators.min(0)]],
    effectiveDate: [''],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }
}
