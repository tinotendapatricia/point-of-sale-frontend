import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { ProductStore } from '@pos-frontend/products/data-access';
import { BmgTable, InlineConfirmComponent, type TableColumnDef } from '@pos-frontend/shared/ui';
import { type StockTakeBatchItem, StockTakeStore } from '@pos-frontend/stock-take/data-access';

/** Step 1: open a batch, count products into it, then close it (confirmed in-page, no modal). */
@Component({
  selector: 'pos-frontend-create-stock-batch',
  templateUrl: './create-stock-batch.component.html',
  styleUrl: './create-stock-batch.component.scss',
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
    BmgTable,
    InlineConfirmComponent,
  ],
})
export class CreateStockBatchComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productStore = inject(ProductStore);
  private readonly stockTakeStore = inject(StockTakeStore);

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly products = this.productStore.products;
  protected readonly creating = this.stockTakeStore.createLoading;
  protected readonly closing = this.stockTakeStore.addProductsLoading;
  /** The open batch; cleared locally once it has been closed. */
  protected readonly batchNumber = linkedSignal<number | null>(
    () => this.stockTakeStore.stockTakeBatch()?.batchNumber ?? null
  );

  protected readonly items = signal<StockTakeBatchItem[]>([]);
  protected readonly editIndex = signal<number | null>(null);
  protected readonly errorMessage = signal('');
  protected readonly confirmingClose = signal(false);

  protected readonly form = this.fb.group({
    code: this.fb.control<string | null>(null, Validators.required),
    quantity: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  protected readonly saveLabel = computed(() => (this.editIndex() === null ? 'Add Product' : 'Update Product'));
  protected readonly rows = computed(
    () => new MatTableDataSource(this.items().map((item, index) => ({ ...item, index, line: index + 1 })))
  );
  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'line', header: '#' },
    { key: 'code', header: 'Code' },
    { key: 'productName', header: 'Product' },
    { key: 'quantity', header: 'Quantity', align: 'right' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

  constructor() {
    this.productStore.getAllProducts();
  }

  protected initiateBatch(): void {
    this.stockTakeStore.createStockTakeBatch();
  }

  protected saveProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { code, quantity } = this.form.getRawValue();
    const product = this.products().find((p) => p.code === code);
    if (!code || !product || quantity === null) {
      return;
    }
    const editIndex = this.editIndex();
    const existing = this.items().findIndex((item, index) => item.code === code && index !== editIndex);
    if (existing >= 0) {
      this.errorMessage.set(`Product already exists on line ${existing + 1}`);
      return;
    }

    const item: StockTakeBatchItem = { id: product.id, code, productName: product.name, quantity };
    this.items.update((items) =>
      editIndex === null ? [...items, item] : items.map((current, index) => (index === editIndex ? item : current))
    );
    this.resetForm();
  }

  protected editProduct(index: number): void {
    const item = this.items()[index];
    if (!item) {
      return;
    }
    this.editIndex.set(index);
    this.errorMessage.set('');
    this.form.reset({ code: item.code, quantity: item.quantity });
  }

  protected deleteProduct(index: number): void {
    this.items.update((items) => items.filter((_, i) => i !== index));
    if (this.editIndex() === index) {
      this.resetForm();
    }
  }

  protected closeBatch(): void {
    const batchNumber = this.batchNumber();
    if (batchNumber === null || this.items().length === 0) {
      return;
    }
    this.stockTakeStore.addProductsToBatch({
      data: { batchNumber, products: this.items() },
      callback: () => {
        this.confirmingClose.set(false);
        this.items.set([]);
        this.resetForm();
        this.batchNumber.set(null);
      },
    });
  }

  private resetForm(): void {
    this.form.reset();
    this.editIndex.set(null);
    this.errorMessage.set('');
  }
}
