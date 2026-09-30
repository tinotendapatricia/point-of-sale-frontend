import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  type FormArray,
  type FormControl,
  type FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import type { PendingCashup } from '@pos-frontend/configurations/data-access';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';
import type { CashupRequest } from '@pos-frontend/reports/data-access';

/** Amount types captured per currency on a cash-up. */
const DENOMINATION_TYPES = ['Cash', 'Card'];

type DenominationGroup = FormGroup<{
  type: FormControl<string>;
  value: FormControl<number>;
}>;

type CurrencyGroup = FormGroup<{
  code: FormControl<string>;
  denominations: FormArray<DenominationGroup>;
}>;

@Component({
  selector: 'pos-frontend-cashup-form',
  templateUrl: './cashup-form.component.html',
  styleUrl: './cashup-form.component.scss',
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
export class CashupFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly currencies = input<CurrencyEntity[]>([]);
  readonly tills = input<PendingCashup[]>([]);
  readonly loading = input(false);

  readonly submitted = output<CashupRequest>();

  /** false: capture today's cash-up; true: reprint a previous one by station and date. */
  protected readonly printPrevious = signal(false);

  protected readonly form = this.fb.group({
    till: this.fb.control<PendingCashup | null>(null, Validators.required),
    currencies: this.fb.array<CurrencyGroup>([]),
  });

  protected readonly previousForm = this.fb.group({
    station: ['', Validators.required],
    tDate: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const groups = this.currencies().map(currency => this.currencyGroup(currency.code));
      this.form.controls.currencies.clear();
      groups.forEach(group => this.form.controls.currencies.push(group));
    });
  }

  protected togglePrintPrevious(): void {
    this.printPrevious.update(value => !value);
  }

  protected total(index: number): number {
    return this.form.controls.currencies
      .at(index)
      .controls.denominations.getRawValue()
      .reduce((sum, denomination) => sum + (Number(denomination.value) || 0), 0);
  }

  protected resetCurrency(index: number): void {
    this.form.controls.currencies.at(index).controls.denominations.controls.forEach(group =>
      group.controls.value.reset()
    );
  }

  protected submit(): void {
    const till = this.form.controls.till.value;
    if (this.form.invalid || !till) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted.emit({
      cashup: this.form.controls.currencies.controls.map((group, index) => ({
        code: group.controls.code.value,
        total: this.total(index),
      })),
      station: String(till.station),
      tDate: till.tDate,
    });
  }

  protected submitPrevious(): void {
    if (this.previousForm.invalid) {
      this.previousForm.markAllAsTouched();
      return;
    }
    this.submitted.emit({ cashup: [], ...this.previousForm.getRawValue() });
  }

  protected tillLabel(till: PendingCashup): string {
    return `Station ${till.station} for ${till.tDate}`;
  }

  private currencyGroup(code: string): CurrencyGroup {
    return this.fb.group({
      code: [code],
      denominations: this.fb.array(
        DENOMINATION_TYPES.map(type =>
          this.fb.group({ type: [type], value: [0, Validators.min(0)] })
        )
      ),
    });
  }
}
