import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { VatEntity } from '@pos-frontend/vat/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type VatFormValue = Pick<VatEntity, 'vat'>;

@Component({
  selector: 'pos-frontend-vat-form',
  templateUrl: './vat-form.component.html',
  styleUrl: './vat-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class VatFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly vat = input<VatEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<VatFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    vat: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  constructor() {
    // Edit mode: reset() rather than patchValue() so the form is pristine/untouched again.
    effect(() => {
      const vat = this.vat();
      if (vat) {
        this.form.reset({ vat: vat.vat });
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
