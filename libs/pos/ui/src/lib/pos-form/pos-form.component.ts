import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { ClrLoadingState } from '@clr/angular';
import { ClrCommonFormsModule } from '@clr/angular/forms/common';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { ClrLoadingButtonModule } from '@clr/angular/button';
import { ClrLoadingModule } from '@clr/angular/utils';
import { ClrModalModule } from '@clr/angular/modal';
import { ClrInputModule } from '@clr/angular/forms/input';
import { ClrRadioModule } from '@clr/angular/forms/radio';
import { ClrSelectModule } from '@clr/angular/forms/select';

import type { ProductsEntity } from '@pos-frontend/products/data-access';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';
import type {
  CreateSaleRequest,
  PosEntity,
  SaleItem,
} from '@pos-frontend/pos/data-access';

/** VAT is not calculated on the till yet; the backend works it out. */
const TOTAL_VAT = 0;

@Component({
  selector: 'pos-frontend-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrl: './pos-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ClrCommonFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    ClrIcon,
    ClrIconModule,
    ClrLoadingButtonModule,
    ClrLoadingModule,
    ClrModalModule,
    ClrInputModule,
    ClrRadioModule,
    ClrSelectModule,
    CurrencyPipe,
  ],
})
export class PosFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly btnState = input<ClrLoadingState>(ClrLoadingState.DEFAULT);
  readonly products = input<ProductsEntity[]>([]);
  readonly debtors = input<DebtorsEntity[]>([]);
  readonly isRefund = input(false);
  readonly isSale = input(false);
  readonly currency = input<CurrencyEntity>();
  /** The last invoice created; a new one clears the till for the next customer. */
  readonly sale = input<PosEntity>();
  /** Till station number, stamped on every sale. */
  readonly station = input<string | null>(null);

  readonly submitted = output<CreateSaleRequest>();

  protected readonly form = this.fb.group({
    code: '',
    quantity: this.fb.control<number | null>(null),
    reference: '',
  });

  protected readonly changeForm = this.fb.group({
    amountOffered: this.fb.control<number | null>(null),
    changeDebtor: this.fb.control<string | number | null>(null),
    costOfGoods: this.fb.control<number | null>(null),
    foreignDebtor: this.fb.control<boolean | null>(null),
  });

  protected readonly debtorControl = this.fb.control<string | number | null>(
    null
  );

  protected readonly opened = signal(false);
  protected readonly items = signal<SaleItem[]>([]);
  protected readonly err = signal('');

  private readonly debtorId = toSignal(this.debtorControl.valueChanges, {
    initialValue: this.debtorControl.value,
  });
  private readonly changeDebtorId = toSignal(
    this.changeForm.controls.changeDebtor.valueChanges,
    { initialValue: this.changeForm.controls.changeDebtor.value }
  );
  private readonly amountOffered = toSignal(
    this.changeForm.controls.amountOffered.valueChanges,
    { initialValue: this.changeForm.controls.amountOffered.value }
  );
  protected readonly foreignChange = toSignal(
    this.changeForm.controls.foreignDebtor.valueChanges,
    { initialValue: this.changeForm.controls.foreignDebtor.value }
  );

  /** Exchange rate of the selected debtor's currency (0 until one is picked). */
  protected readonly rate = computed(() => {
    const debtor = this.debtors().find((d) => d.id === this.debtorId());
    return debtor?.currency.rate[0]?.value ?? 0;
  });

  private readonly changeDebtor = computed(() =>
    this.debtors().find((d) => d.id === this.changeDebtorId())
  );

  private readonly changeRate = computed(
    () => this.changeDebtor()?.currency.rate[0]?.value ?? null
  );

  protected readonly totalAmount = computed(() =>
    this.items().reduce((sum, item) => sum + item.totalAmt, 0)
  );

  protected readonly changeDue = computed(() => {
    const change =
      Number(this.amountOffered() ?? 0) - this.totalAmount() * this.rate();
    const changeRate = this.changeRate();
    return changeRate === null ? change : change * changeRate;
  });

  protected readonly canProcess = computed(
    () => this.items().length > 0 && this.debtorId() !== null
  );

  constructor() {
    effect(() => {
      if (this.sale()) {
        untracked(() => this.cancelTransaction());
      }
    });
  }

  protected addProduct(): void {
    const { code, quantity } = this.form.getRawValue();
    const product = code
      ? this.products().find((p) => p.code === code)
      : undefined;
    if (!product) {
      return;
    }

    const qty = quantity && quantity > 0 ? quantity : 1;
    const price = product.price[0]?.value ?? 0;
    this.items.update((items) => [
      ...items,
      {
        code: product.code,
        description: product.name,
        productId: product.id,
        quantity: qty,
        price,
        cost: product.cost[0]?.value ?? 0,
        totalAmt: price * qty,
      },
    ]);
    this.form.reset();
  }

  protected cancelTransaction(): void {
    this.items.set([]);
    this.debtorControl.reset();
  }

  protected remove(index: number): void {
    this.items.update((items) => items.filter((_, i) => i !== index));
  }

  protected initChange(): void {
    this.opened.set(true);
    this.changeForm.controls.costOfGoods.patchValue(
      this.totalAmount() * this.rate()
    );
  }

  protected processReceipt(): void {
    const debtor = this.debtorControl.value;
    if (debtor === null) {
      this.err.set('Select Debtor Account');
      return;
    }

    const total = this.totalAmount();
    const changeRate = this.changeRate();
    const { foreignDebtor, changeDebtor } = this.changeForm.getRawValue();

    this.submitted.emit({
      products: this.items(),
      totalAmountExcVat: total,
      totalVat: TOTAL_VAT,
      total: total + TOTAL_VAT,
      debtor,
      station: this.station(),
      rate: this.rate(),
      transactionType: this.isRefund() ? 2 : 1,
      reference: this.form.controls.reference.value,
      changeDebtor: foreignDebtor ? changeDebtor : null,
      changeRate,
      changeAmount: changeRate === null ? null : this.changeDue(),
    });

    this.cancelTransaction();
    this.opened.set(false);
  }
}
