import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  type FormControl,
  type FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { CreditorStore } from '@pos-frontend/creditors/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type PurchaseOrderLineRequest, PurchaseOrderStore } from '@pos-frontend/purchase-orders/data-access';
import { map } from 'rxjs';

/** One order line; quantity and unit cost stay editable in the items table. */
type ItemGroup = FormGroup<{
  product: FormControl<string | number>;
  code: FormControl<string>;
  description: FormControl<string>;
  quantity: FormControl<number | null>;
  unitCost: FormControl<number | null>;
}>;

interface ItemValue {
  quantity: number | null;
  unitCost: number | null;
}

const lineTotal = ({ quantity, unitCost }: ItemValue): number => (quantity ?? 0) * (unitCost ?? 0);

@Component({
  selector: 'pos-frontend-create-purchase-order',
  templateUrl: './create-purchase-order.component.html',
  styleUrl: './create-purchase-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
  ],
})
export class CreatePurchaseOrderComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productStore = inject(ProductStore);
  private readonly creditorStore = inject(CreditorStore);
  private readonly purchaseOrderStore = inject(PurchaseOrderStore);

  protected readonly products = this.productStore.products;
  protected readonly creditors = this.creditorStore.creditors;
  protected readonly submitting = this.purchaseOrderStore.createLoading;
  protected readonly purchaseOrderNumber = computed(() => this.purchaseOrderStore.purchaseOrder()?.orderNumber);

  protected readonly form = this.fb.group({
    creditor: this.fb.control<string | number | null>(null, Validators.required),
    date: [''],
    reference: [''],
    items: this.fb.array<ItemGroup>([]),
  });

  /** The "add item" row above the table. */
  protected readonly itemForm = this.fb.group({
    code: this.fb.control<string | null>(null, Validators.required),
    quantity: this.fb.control<number | null>(1, [Validators.required, Validators.min(1)]),
    unitCost: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  protected readonly itemError = signal('');

  protected readonly items = this.form.controls.items;
  private readonly itemValues = toSignal(
    this.items.valueChanges.pipe(map(() => this.items.getRawValue())),
    { initialValue: [] }
  );
  private readonly entryValue = toSignal(
    this.itemForm.valueChanges.pipe(map(() => this.itemForm.getRawValue())),
    { initialValue: this.itemForm.getRawValue() }
  );

  protected readonly entryTotal = computed(() => lineTotal(this.entryValue()));
  protected readonly totalQuantity = computed(() =>
    this.itemValues().reduce((sum, item) => sum + (item.quantity ?? 0), 0)
  );
  protected readonly totalAmount = computed(() =>
    this.itemValues().reduce((sum, item) => sum + lineTotal(item), 0)
  );

  constructor() {
    this.productStore.getAllProducts();
    this.creditorStore.getAllCreditors();
  }

  protected lineTotal(item: ItemGroup): number {
    return lineTotal(item.getRawValue());
  }

  /** Picking a product pre-fills its current unit cost. */
  protected productSelected(): void {
    const product = this.findProduct(this.itemForm.controls.code.value);
    this.itemForm.controls.unitCost.setValue(product?.cost[0]?.value ?? null);
  }

  protected addItem(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    const { code, quantity, unitCost } = this.itemForm.getRawValue();
    const product = this.findProduct(code);
    if (!code || !product) {
      return;
    }
    if (this.items.getRawValue().some((item) => item.code === code)) {
      this.itemError.set('Product already added');
      return;
    }

    this.items.push(
      this.fb.group({
        product: [product.id],
        code: [code],
        description: [product.name],
        quantity: this.fb.control(quantity, [Validators.required, Validators.min(1)]),
        unitCost: this.fb.control(unitCost, [Validators.required, Validators.min(0)]),
      })
    );
    this.resetItemForm();
  }

  protected removeItem(index: number): void {
    this.items.removeAt(index);
  }

  /** Clears the whole order, e.g. after a successful create. */
  protected reset(): void {
    this.form.reset();
    this.items.clear();
    this.resetItemForm();
  }

  protected submit(): void {
    const { creditor, reference } = this.form.getRawValue();
    if (this.form.invalid || creditor === null) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.items.length === 0) {
      this.itemError.set('Add at least one product');
      return;
    }

    const products = this.items.getRawValue().map<PurchaseOrderLineRequest>((item) => {
      const quantity = item.quantity ?? 0;
      const value = lineTotal(item);
      // Same payload as before the redesign: the backend reads `cost` as the line value.
      return {
        product: item.product,
        code: item.code,
        description: item.description,
        quantityPurchased: quantity,
        quantity,
        cost: value,
        value,
      };
    });

    this.purchaseOrderStore.createPurchaseOrder({
      data: {
        creditor,
        reference,
        totalAmount: this.totalAmount(),
        totalQty: this.totalQuantity(),
        products,
      },
      callback: () => this.reset(),
    });
  }

  private resetItemForm(): void {
    this.itemForm.reset({ code: null, quantity: 1, unitCost: null });
    this.itemError.set('');
  }

  private findProduct(code: string | null) {
    return this.products().find((product) => product.code === code);
  }
}
