import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { BmgTable, InlineConfirmComponent, type TableColumnDef } from '@pos-frontend/shared/ui';
import {
  type AdjustedStockValue,
  type CountedStockItem,
  StockTakeStore,
} from '@pos-frontend/stock-take/data-access';

const COLUMNS: TableColumnDef[] = [
  { key: 'productId', header: 'Product Id' },
  { key: 'name', header: 'Product' },
  { key: 'batchCount', header: 'Batch Count', align: 'right' },
  { key: 'systemCount', header: 'System Count', align: 'right' },
  { key: 'variance', header: 'Variance', align: 'right' },
];

/** Step 2: compare a closed batch with system stock, then adjust (confirmed in-page, no modal). */
@Component({
  selector: 'pos-frontend-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrl: './stock-take.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BmgTable,
    InlineConfirmComponent,
  ],
})
export class StockTakeComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly productStore = inject(ProductStore);
  private readonly stockTakeStore = inject(StockTakeStore);

  protected readonly columns = COLUMNS;
  protected readonly loading = this.stockTakeStore.getBatchProductsLoading;
  protected readonly adjusting = this.stockTakeStore.adjustLoading;
  protected readonly comparedBatch = signal<number | null>(null);
  protected readonly confirmingAdjust = signal(false);

  protected readonly form = this.fb.group({
    batchNumber: this.fb.control<number | null>(null, Validators.required),
  });

  /** Counted batch lines paired with their product, skipping products no longer in the catalogue. */
  private readonly matches = computed(() => {
    const products = this.productStore.products();
    return this.stockTakeStore.batchProducts().flatMap((counted) => {
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
  protected readonly hasComparison = computed(() => this.comparedBatch() !== null && this.comparison().length > 0);

  protected compare(): void {
    const { batchNumber } = this.form.getRawValue();
    if (batchNumber === null) {
      this.form.markAllAsTouched();
      return;
    }
    this.comparedBatch.set(batchNumber);
    this.confirmingAdjust.set(false);
    this.stockTakeStore.getBatchProducts({ batchNumber });
    // Refresh the system counts so the variance is current.
    this.productStore.getAllProducts();
  }

  protected adjustStock(): void {
    const batchNumber = this.comparedBatch();
    if (batchNumber === null || !this.hasComparison()) {
      return;
    }
    this.stockTakeStore.adjustStock({
      data: { batchNumber, values: this.countedItems(), adjustedValues: this.comparison() },
      callback: () => void this.router.navigate(['/dashboard']),
    });
  }
}
