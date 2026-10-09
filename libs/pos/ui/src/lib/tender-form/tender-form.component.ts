import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';

/** Change details the till adds to a sale once the customer has paid. */
export interface TenderFormValue {
  changeDebtor: string | number | null;
  changeRate: number | null;
  changeAmount: number | null;
}

/** Takes the amount tendered and works out the change, optionally in another currency. */
@Component({
  selector: 'pos-frontend-tender-form',
  templateUrl: './tender-form.component.html',
  styleUrl: './tender-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
  ],
})
export class TenderFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  /** Amount due, already converted to the sale account's currency. */
  readonly amountDue = input.required<number>();
  readonly debtors = input<DebtorsEntity[]>([]);
  readonly loading = input(false);
  readonly submitLabel = input('Process');

  readonly submitted = output<TenderFormValue>();
  readonly cancelled = output<void>();

  protected readonly form = this.fb.group({
    amountOffered: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    foreignChange: false,
    changeDebtor: this.fb.control<string | number | null>(null),
  });

  private readonly amountOffered = toSignal(
    this.form.controls.amountOffered.valueChanges,
    { initialValue: this.form.controls.amountOffered.value }
  );
  protected readonly foreignChange = toSignal(
    this.form.controls.foreignChange.valueChanges,
    { initialValue: this.form.controls.foreignChange.value }
  );
  private readonly changeDebtorId = toSignal(
    this.form.controls.changeDebtor.valueChanges,
    { initialValue: this.form.controls.changeDebtor.value }
  );

  /** Rate of the change account's currency, only when change is given in another currency. */
  private readonly changeRate = computed(() => {
    if (!this.foreignChange()) {
      return null;
    }
    const debtor = this.debtors().find((d) => d.id === this.changeDebtorId());
    return debtor?.currency.rate[0]?.value ?? null;
  });

  protected readonly changeDue = computed(() => {
    const change = Number(this.amountOffered() ?? 0) - this.amountDue();
    const changeRate = this.changeRate();
    return changeRate === null ? change : change * changeRate;
  });

  protected submit(): void {
    const { foreignChange, changeDebtor } = this.form.getRawValue();
    if (this.form.invalid || (foreignChange && changeDebtor === null)) {
      this.form.markAllAsTouched();
      return;
    }
    const changeRate = this.changeRate();
    this.submitted.emit({
      changeDebtor: foreignChange ? changeDebtor : null,
      changeRate,
      changeAmount: changeRate === null ? null : this.changeDue(),
    });
  }
}
