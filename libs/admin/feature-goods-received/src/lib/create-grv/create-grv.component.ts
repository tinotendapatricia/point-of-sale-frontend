import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PurchaseOrderStore, type ReceivedProductLine } from '@pos-frontend/purchase-orders/data-access';

@Component({
  selector: 'pos-frontend-create-grv',
  templateUrl: './create-grv.component.html',
  styleUrl: './create-grv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
  ],
})
export class CreateGrvComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly purchaseOrderStore = inject(PurchaseOrderStore);

  /** Lines of the looked-up purchase order; the store clears them after a successful receive. */
  protected readonly lines = this.purchaseOrderStore.purchaseOrderLines;
  protected readonly loadingOrder = this.purchaseOrderStore.getOneLoading;
  protected readonly submitting = this.purchaseOrderStore.receiveLoading;

  protected readonly form = this.fb.group({
    purchaseOrder: this.fb.control<number | null>(null, Validators.required),
    reference: [''],
  });

  /** One "quantity received" control per order line, rebuilt when the lines change. */
  protected readonly quantities = this.fb.array<number>([]);
  private readonly quantityValues = toSignal(this.quantities.valueChanges, { initialValue: [] });

  protected readonly receivedLines = computed<ReceivedProductLine[]>(() => {
    const quantities = this.quantityValues();
    return this.lines().map((line, index) => {
      const unitCost = line.quantity ? line.amount / line.quantity : 0;
      const qtyReceived = Number(quantities[index] ?? 0) || 0;
      return { ...line, qtyReceived, unitCost, receivedValue: qtyReceived * unitCost };
    });
  });

  protected readonly hasLines = computed(() => this.lines().length > 0);
  protected readonly totalQuantity = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));
  protected readonly totalPurchaseCost = computed(() => this.lines().reduce((sum, line) => sum + line.amount, 0));
  protected readonly totalQtyReceived = computed(() =>
    this.receivedLines().reduce((sum, line) => sum + line.qtyReceived, 0)
  );
  protected readonly totalReceivedValue = computed(() =>
    this.receivedLines().reduce((sum, line) => sum + line.receivedValue, 0)
  );
  protected readonly canSubmit = computed(
    () => this.hasLines() && this.totalQtyReceived() > 0 && !this.submitting()
  );

  constructor() {
    effect(() => {
      const lines = this.lines();
      this.quantities.clear({ emitEvent: false });
      lines.forEach(() => this.quantities.push(this.fb.control(0, Validators.min(0)), { emitEvent: false }));
      this.quantities.updateValueAndValidity();
    });
  }

  protected getPurchaseOrder(): void {
    const { purchaseOrder } = this.form.getRawValue();
    if (purchaseOrder === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.purchaseOrderStore.getPurchaseOrder({ id: purchaseOrder });
  }

  protected receive(): void {
    const { purchaseOrder, reference } = this.form.getRawValue();
    if (purchaseOrder === null || !this.canSubmit()) {
      this.form.markAllAsTouched();
      return;
    }
    // The store clears `purchaseOrderLines` on success, which empties the items table.
    this.purchaseOrderStore.receivePurchaseOrder({
      data: {
        purchaseOrderNumber: purchaseOrder,
        reference,
        products: this.receivedLines().filter((line) => line.qtyReceived > 0),
        totalAmount: this.totalReceivedValue(),
        totalQty: this.totalQtyReceived(),
      },
      callback: () => undefined,
    });
  }
}
