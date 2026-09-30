import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import type { ProductsEntity } from '@pos-frontend/products/data-access';
import { BmgTable, type TableColumnDef } from '@pos-frontend/shared/ui';
import type {
  AdjustStockRequest,
  AdjustedStockValue,
  CountedStockItem,
  StockTakeBatchProduct,
} from '@pos-frontend/stock-take/data-access';

const COLUMNS: TableColumnDef[] = [
  { key: 'productId', header: 'Product Id' },
  { key: 'name', header: 'Product Name' },
  { key: 'batchCount', header: 'Batch Count' },
  { key: 'systemCount', header: 'System Count' },
  { key: 'variance', header: 'Variance' },
];

@Component({
  selector: 'pos-frontend-stock-take-count-form',
  templateUrl: './stock-take-count-form.component.html',
  styleUrl: './stock-take-count-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, BmgTable],
})
export class StockTakeCountFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly batchProducts = input<StockTakeBatchProduct[]>([]);
  readonly products = input<ProductsEntity[]>([]);
  readonly loading = input(false);

  /** Emits the batch number to compare against the system stock. */
  readonly comparisonStarted = output<number>();
  readonly adjusted = output<AdjustStockRequest>();

  protected readonly columns = COLUMNS;
  protected readonly comparedBatch = signal<number | null>(null);

  protected readonly form = this.fb.group({
    batchNumber: this.fb.control<number | null>(null, Validators.required),
  });

  private readonly matches = computed(() => {
    const products = this.products();
    return this.batchProducts().flatMap((counted) => {
      const product = products.find((p) => p.id === counted.productId);
      return product ? [{ counted, product }] : [];
    });
  });

  protected readonly comparison = computed<AdjustedStockValue[]>(() =>
    this.matches().map(({ counted, product }) => ({
      productId: counted.productId,
      name: product.name,
      batchCount: counted.quantity,
      systemCount: product.quantity,
      variance: counted.quantity - product.quantity,
    }))
  );

  private readonly countedItems = computed<CountedStockItem[]>(() =>
    this.matches().map(({ counted }) => ({
      product: counted.productId,
      quantity: counted.quantity,
      adjustedOnBatch: counted.stockBatch,
    }))
  );

  protected readonly dataSource = computed(() => new MatTableDataSource(this.comparison()));
  protected readonly hasComparison = computed(() => this.comparison().length > 0);

  protected startComparison(): void {
    const { batchNumber } = this.form.getRawValue();
    if (batchNumber === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.comparedBatch.set(batchNumber);
    this.comparisonStarted.emit(batchNumber);
  }

  protected adjustStock(): void {
    const batchNumber = this.comparedBatch();
    if (batchNumber === null || !this.hasComparison()) {
      return;
    }
    this.adjusted.emit({
      batchNumber,
      values: this.countedItems(),
      adjustedValues: this.comparison(),
    });
  }
}
