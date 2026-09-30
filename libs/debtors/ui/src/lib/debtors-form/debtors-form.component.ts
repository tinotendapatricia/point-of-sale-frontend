import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';
import type { DebtorRequest, DebtorsEntity } from '@pos-frontend/debtors/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type DebtorFormValue = Pick<DebtorRequest, 'name' | 'account' | 'currency' | 'discount'>;

@Component({
  selector: 'pos-frontend-debtors-form',
  templateUrl: './debtors-form.component.html',
  styleUrl: './debtors-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class DebtorsFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly debtor = input<DebtorsEntity>();
  readonly currencies = input<CurrencyEntity[]>([]);
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<DebtorFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    account: ['', Validators.required],
    currency: this.fb.control<string | number | null>(null, Validators.required),
    discount: [0, [Validators.min(0), Validators.max(100)]],
  });

  constructor() {
    // Edit mode: reset() rather than patchValue() so the form is pristine/untouched again.
    effect(() => {
      const debtor = this.debtor();
      if (debtor) {
        this.form.reset({
          name: debtor.name,
          account: debtor.account,
          currency: debtor.currency?.id ?? null,
          discount: debtor.discount ?? 0,
        });
      }
    });
  }

  protected submit(): void {
    const { currency, ...rest } = this.form.getRawValue();
    if (this.form.invalid || currency === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit({ ...rest, currency });
  }
}
