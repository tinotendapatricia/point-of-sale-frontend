import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import type {
  PurchaseOrderReceivableLine,
  ReceivePurchaseOrderRequest,
  ReceivedProductLine,
} from '@pos-frontend/purchase-orders/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

@Component({
  selector: 'pos-frontend-grv-form',
  templateUrl: './grv-form.component.html',
  styleUrl: './grv-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    BmgTable,
  ],
})
export class GrvFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  /** Lines of the looked-up purchase order. */
  readonly lines = input<PurchaseOrderReceivableLine[]>([]);
  readonly loadingOrder = input(false);
  readonly loading = input(false);

  readonly orderRequested = output<number>();
  readonly submitted = output<ReceivePurchaseOrderRequest>();

  private readonly qtyReceivedTpl = viewChild<TemplateRef<unknown>>('qtyReceivedTpl');
  private readonly amountTpl = viewChild<TemplateRef<unknown>>('amountTpl');
  private readonly receivedValueTpl = viewChild<TemplateRef<unknown>>('receivedValueTpl');

  protected readonly form = this.fb.group({
    purchaseOrder: this.fb.control<number | null>(null, Validators.required),
    reference: [''],
  });

  /** One "quantity received" control per order line, rebuilt when the lines change. */
  protected readonly quantities = this.fb.array<number>([]);

  private readonly quantityValues = toSignal(this.quantities.valueChanges, {
    initialValue: [],
  });

  protected readonly receivedLines = computed<ReceivedProductLine[]>(() => {
    const quantities = this.quantityValues();
    return this.lines().map((line, index) => {
      const unitCost = line.quantity ? line.amount / line.quantity : 0;
      const qtyReceived = Number(quantities[index] ?? 0) || 0;
      return { ...line, qtyReceived, unitCost, receivedValue: qtyReceived * unitCost };
    });
  });

  // Depends on the lines only, so typing a quantity doesn't re-render the rows (and drop focus).
  protected readonly rows = computed(
    () =>
      new MatTableDataSource(
        this.lines().map((line, index) => ({
          ...line,
          index,
          control: this.quantities.at(index),
        }))
      )
  );

  protected readonly totalQuantity = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0)
  );
  protected readonly totalPurchaseCost = computed(() =>
    this.lines().reduce((sum, line) => sum + line.amount, 0)
  );
  protected readonly totalQtyReceived = computed(() =>
    this.receivedLines().reduce((sum, line) => sum + line.qtyReceived, 0)
  );
  protected readonly totalReceivedValue = computed(() =>
    this.receivedLines().reduce((sum, line) => sum + line.receivedValue, 0)
  );
  protected readonly hasLines = computed(() => this.lines().length > 0);
  protected readonly canSubmit = computed(
    () => this.hasLines() && this.totalQtyReceived() > 0 && !this.loading()
  );

  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'name', header: 'Product' },
    { key: 'quantity', header: 'Purchased Quantity' },
    { key: 'qtyReceived', header: 'Qty Received', template: this.qtyReceivedTpl() },
    { key: 'amount', header: 'Purchased Value', template: this.amountTpl() },
    { key: 'receivedValue', header: 'Received Value', template: this.receivedValueTpl() },
  ]);

  constructor() {
    effect(() => {
      const lines = this.lines();
      this.quantities.clear({ emitEvent: false });
      lines.forEach(() => {
        this.quantities.push(this.fb.control(0, Validators.min(0)), { emitEvent: false });
      });
      this.quantities.updateValueAndValidity();
    });
  }

  protected requestOrder(): void {
    const { purchaseOrder } = this.form.getRawValue();
    if (purchaseOrder === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.orderRequested.emit(purchaseOrder);
  }

  protected submit(): void {
    const { purchaseOrder, reference } = this.form.getRawValue();
    if (purchaseOrder === null || !this.canSubmit()) {
      this.form.markAllAsTouched();
      return;
    }
    const products = this.receivedLines().filter((line) => line.qtyReceived > 0);
    this.submitted.emit({
      purchaseOrderNumber: purchaseOrder,
      reference,
      products,
      totalAmount: this.totalReceivedValue(),
      totalQty: this.totalQtyReceived(),
    });
  }
}
