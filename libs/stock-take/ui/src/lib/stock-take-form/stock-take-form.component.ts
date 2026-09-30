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
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import type { ProductsEntity } from '@pos-frontend/products/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import type { StockTakeBatchItem } from '@pos-frontend/stock-take/data-access';

@Component({
  selector: 'pos-frontend-stock-take-form',
  templateUrl: './stock-take-form.component.html',
  styleUrl: './stock-take-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BmgTable,
  ],
})
export class StockTakeFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly products = input<ProductsEntity[]>([]);

  /** Emits the counted products when the user closes the batch. */
  readonly submitted = output<StockTakeBatchItem[]>();

  private readonly actionsTpl = viewChild<TemplateRef<unknown>>('actionsTpl');

  protected readonly items = signal<StockTakeBatchItem[]>([]);
  protected readonly editIndex = signal<number | null>(null);
  protected readonly errorMessage = signal('');

  protected readonly form = this.fb.group({
    code: this.fb.control<string | null>(null, Validators.required),
    quantity: this.fb.control<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  protected readonly buttonLabel = computed(() =>
    this.editIndex() === null ? 'Add Product' : 'Update Product'
  );
  protected readonly rows = computed(
    () =>
      new MatTableDataSource(
        this.items().map((item, index) => ({ ...item, index, line: index + 1 }))
      )
  );
  protected readonly columns = computed<TableColumnDef[]>(() => [
    { key: 'line', header: '#' },
    { key: 'code', header: 'Product' },
    { key: 'productName', header: 'Product Description' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'actions', header: '', align: 'right', template: this.actionsTpl() },
  ]);

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
    const existing = this.items().findIndex(
      (item, index) => item.code === code && index !== editIndex
    );
    if (existing >= 0) {
      this.errorMessage.set(`Product already exists on line ${existing + 1}`);
      return;
    }

    const item: StockTakeBatchItem = {
      id: product.id,
      code,
      productName: product.name,
      quantity,
    };
    this.items.update((items) =>
      editIndex === null
        ? [...items, item]
        : items.map((current, index) => (index === editIndex ? item : current))
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

  protected submit(): void {
    if (this.items().length) {
      this.submitted.emit(this.items());
    }
  }

  private resetForm(): void {
    this.form.reset();
    this.editIndex.set(null);
    this.errorMessage.set('');
  }
}
