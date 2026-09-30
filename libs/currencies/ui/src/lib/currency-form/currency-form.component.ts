import {
  ChangeDetectionStrategy,
  Component,
  effect,
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
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';

/** What the form emits: only the fields the user edits, never id or audit fields. */
export type CurrencyFormValue = Pick<CurrencyEntity, 'name' | 'code' | 'symbol'>;

@Component({
  selector: 'pos-frontend-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrl: './currency-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class CurrencyFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly currency = input<CurrencyEntity>();
  readonly loading = input(false);
  readonly submitLabel = input('Submit');

  readonly submitted = output<CurrencyFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
    symbol: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const currency = this.currency();
      if (currency) {
        this.form.reset({
          name: currency.name,
          code: currency.code,
          symbol: currency.symbol,
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
