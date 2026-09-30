import { ChangeDetectionStrategy, Component, Injector, inject, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  type AddProductsToBatchRequest,
  type StockTakeBatchItem,
  StockTakeStore,
} from '@pos-frontend/stock-take/data-access';
import { StockTakeFormComponent } from '@pos-frontend/stock-take/ui';

import { CloseBatchComponent } from '../close-batch/close-batch.component';

@Component({
  selector: 'pos-frontend-create-stock-batch',
  templateUrl: './create-stock-batch.component.html',
  styleUrl: './create-stock-batch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StockTakeFormComponent, MatButtonModule, MatProgressSpinnerModule],
})
export class CreateStockBatchComponent {
  private readonly dialog = inject(MatDialog);
  private readonly injector = inject(Injector);
  private readonly productStore = inject(ProductStore);
  private readonly stockTakeStore = inject(StockTakeStore);

  protected readonly products = this.productStore.products;
  protected readonly creating = this.stockTakeStore.createLoading;
  /** The open batch; cleared locally once it has been closed. */
  protected readonly batchNumber = linkedSignal<number | null>(
    () => this.stockTakeStore.stockTakeBatch()?.batchNumber ?? null
  );

  constructor() {
    this.productStore.getAllProducts();
  }

  protected initiateBatch(): void {
    this.stockTakeStore.createStockTakeBatch();
  }

  protected closeBatch(products: StockTakeBatchItem[]): void {
    const batchNumber = this.batchNumber();
    if (batchNumber === null) {
      return;
    }
    this.dialog
      .open<CloseBatchComponent, AddProductsToBatchRequest, boolean>(CloseBatchComponent, {
        width: '420px',
        data: { batchNumber, products },
        injector: this.injector,
      })
      .afterClosed()
      .subscribe((closed) => {
        if (closed) {
          this.batchNumber.set(null);
        }
      });
  }
}
