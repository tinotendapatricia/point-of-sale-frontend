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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';

import type { ProductsEntity } from '@pos-frontend/products/data-access';
import type { DebtorsEntity } from '@pos-frontend/debtors/data-access';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';
import type {
  CreateSaleRequest,
  PosEntity,
  SaleItem,
  TransactionType,
} from '@pos-frontend/pos/data-access';
import {
  TenderFormComponent,
  type TenderFormValue,
} from '../tender-form/tender-form.component';

/** VAT is not calculated on the till yet; the backend works it out. */
const TOTAL_VAT = 0;

/** The till: builds a cart, takes the tender and emits the sale or refund. */
@Component({
  selector: 'pos-frontend-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrl: './pos-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    NgSelectComponent,
    NgOptionComponent,
    TenderFormComponent,
  ],
})
export class PosFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly products = input<ProductsEntity[]>([]);
  readonly debtors = input<DebtorsEntity[]>([]);
  readonly currency = input<CurrencyEntity>();
  readonly loading = input(false);
  /** 1 = sale, 2 = refund. */
  readonly transactionType = input<TransactionType>(1);
  /** The last invoice created; a new one clears the till for the next customer. */
  readonly sale = input<PosEntity>();
  /** Till station number, stamped on every sale. */
  readonly station = input<string | null>(null);

  readonly submitted = output<CreateSaleRequest>();

  protected readonly form = this.fb.group({
    code: this.fb.control<string | null>(null),
    quantity: this.fb.control<number | null>(null),
    reference: '',
  });

  protected readonly debtorControl = this.fb.control<string | number | null>(
    null
  );

  protected readonly columns = [
    'code',
    'description',
    'quantity',
    'amount',
    'actions',
  ];
  protected readonly items = signal<SaleItem[]>([]);
  protected readonly tendering = signal(false);

  private readonly debtorId = toSignal(this.debtorControl.valueChanges, {
    initialValue: this.debtorControl.value,
  });

  protected readonly isRefund = computed(() => this.transactionType() === 2);

  /** Exchange rate of the selected debtor's currency (0 until one is picked). */
  protected readonly rate = computed(() => {
    const debtor = this.debtors().find((d) => d.id === this.debtorId());
    return debtor?.currency.rate[0]?.value ?? 0;
  });

  protected readonly totalAmount = computed(() =>
    this.items().reduce((sum, item) => sum + item.totalAmt, 0)
  );

  /** What the customer pays, in the selected account's currency. */
  protected readonly amountDue = computed(
    () => this.totalAmount() * this.rate()
  );

  protected readonly canCharge = computed(
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
    this.form.patchValue({ code: null, quantity: null });
  }

  protected remove(index: number): void {
    this.items.update((items) => items.filter((_, i) => i !== index));
  }

  protected cancelTransaction(): void {
    this.items.set([]);
    this.tendering.set(false);
    this.form.reset();
    this.debtorControl.reset();
  }

  protected charge(): void {
    if (this.canCharge()) {
      this.tendering.set(true);
    }
  }

  /** The cart is cleared when the new invoice arrives through `sale`, not here. */
  protected processReceipt(tender: TenderFormValue): void {
    const debtor = this.debtorControl.value;
    if (debtor === null) {
      return;
    }

    const total = this.totalAmount();
    this.submitted.emit({
      products: this.items(),
      totalAmountExcVat: total,
      totalVat: TOTAL_VAT,
      total: total + TOTAL_VAT,
      debtor,
      station: this.station(),
      rate: this.rate(),
      transactionType: this.transactionType(),
      reference: this.form.controls.reference.value,
      ...tender,
    });
  }
}
