import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import type { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import type { ProductsEntity } from '@pos-frontend/products/data-access';
import type {
  CreatePurchaseOrderRequest,
  PurchaseOrderLineRequest,
} from '@pos-frontend/purchase-orders/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';

@Component({
  selector: 'pos-frontend-purchase-order-form',
  templateUrl: './purchase-order-form.component.html',
  styleUrl: './purchase-order-form.component.scss',
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
    BmgTable,
  ],
})
export class PurchaseOrderFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly purchaseOrderNumber = input<string>();
  readonly products = input.required<ProductsEntity[]>();
  readonly creditors = input.required<CreditorsEntity[]>();
  readonly loading = input(false);

  readonly submitted = output<CreatePurchaseOrderRequest>();

  private readonly valueTpl = viewChild<TemplateRef<unknown>>('valueTpl');
  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly lines = signal<PurchaseOrderLineRequest[]>([]);
  protected readonly editIndex = signal<number | null>(null);
  protected readonly lineError = signal('');

  protected readonly form = this.fb.group({
    date: [''],
    creditor: this.fb.control<string | number | null>(null, Validators.required),
    reference: [''],
  });

  protected readonly lineForm = this.fb.group({
    code: this.fb.control<string | null>(null, Validators.required),
    name: [''],
    quantityPurchased: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    cost: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  protected readonly lineButtonLabel = computed(() =>
    this.editIndex() === null ? 'Add Product' : 'Update Product'
  );
  protected readonly totalAmount = computed(() =>
    this.lines().reduce((sum, line) => sum + line.value, 0)
  );
  protected readonly totalQuantity = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0)
  );
  protected readonly rows = computed(
    () => new MatTableDataSource(this.lines().map((line, index) => ({ ...line, index })))
  );
  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'code', header: 'Product Code' },
    { key: 'description', header: 'Description' },
    { key: 'quantityPurchased', header: 'Quantity' },
    { key: 'value', header: 'Value', template: this.valueTpl() },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  /** Clears the whole order, e.g. after a successful create. */
  reset(): void {
    this.form.reset();
    this.resetLine();
    this.lines.set([]);
  }

  protected productSelected(): void {
    const product = this.findProduct(this.lineForm.controls.code.value);
    this.lineForm.patchValue({
      name: product?.name ?? '',
      cost: product?.cost[0]?.value ?? null,
    });
  }

  protected saveLine(): void {
    if (this.lineForm.invalid) {
      this.lineForm.markAllAsTouched();
      return;
    }
    const { code, name, quantityPurchased, cost } = this.lineForm.getRawValue();
    const product = this.findProduct(code);
    if (!code || !product || quantityPurchased === null || cost === null) {
      return;
    }
    const editIndex = this.editIndex();
    const duplicate = this.lines().some(
      (line, index) => line.code === code && index !== editIndex
    );
    if (duplicate) {
      this.lineError.set('Product already added');
      return;
    }

    const value = cost * quantityPurchased;
    const line: PurchaseOrderLineRequest = {
      product: product.id,
      code,
      description: name,
      quantityPurchased,
      quantity: quantityPurchased,
      cost: value,
      value,
    };
    this.lines.update((lines) =>
      editIndex === null
        ? [...lines, line]
        : lines.map((existing, index) => (index === editIndex ? line : existing))
    );
    this.resetLine();
  }

  protected editLine(index: number): void {
    const line = this.lines()[index];
    if (!line) {
      return;
    }
    this.editIndex.set(index);
    this.lineError.set('');
    this.lineForm.reset({
      code: line.code,
      name: line.description,
      quantityPurchased: line.quantityPurchased,
      cost: line.quantityPurchased ? line.cost / line.quantityPurchased : 0,
    });
  }

  protected removeLine(index: number): void {
    this.lines.update((lines) => lines.filter((_, i) => i !== index));
    if (this.editIndex() === index) {
      this.resetLine();
    }
  }

  protected submit(): void {
    const { creditor, reference } = this.form.getRawValue();
    if (this.form.invalid || creditor === null) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.lines().length) {
      this.lineError.set('Add at least one product');
      return;
    }
    this.submitted.emit({
      creditor,
      reference,
      totalAmount: this.totalAmount(),
      totalQty: this.totalQuantity(),
      products: this.lines(),
    });
  }

  private resetLine(): void {
    this.lineForm.reset();
    this.editIndex.set(null);
    this.lineError.set('');
  }

  private findProduct(code: string | null): ProductsEntity | undefined {
    return this.products().find((product) => product.code === code);
  }
}
