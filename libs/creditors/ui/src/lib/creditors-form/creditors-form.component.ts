import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import type { CreditorRequest, CreditorsEntity } from '@pos-frontend/creditors/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type CreditorFormValue = Required<Pick<CreditorRequest, 'account' | 'name' | 'address' | 'description'>>;

@Component({
  selector: 'pos-frontend-creditors-form',
  templateUrl: './creditors-form.component.html',
  styleUrl: './creditors-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
})
export class CreditorsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly creditor = input<CreditorsEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<CreditorFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    account: ['', Validators.required],
    name: ['', Validators.required],
    address: [''],
    description: [''],
  });

  constructor() {
    // Edit mode: reset() rather than patchValue() so the form is pristine/untouched again.
    effect(() => {
      const creditor = this.creditor();
      if (creditor) {
        this.form.reset({
          account: creditor.account,
          name: creditor.name,
          address: creditor.address ?? '',
          description: creditor.description ?? '',
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
