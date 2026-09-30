import { ChangeDetectionStrategy, Component, Injector, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type AdjustStockRequest, StockTakeStore } from '@pos-frontend/stock-take/data-access';
import { StockTakeCountFormComponent } from '@pos-frontend/stock-take/ui';

import { StockAdjustmentComponent } from '../stock-adjustment/stock-adjustment.component';

@Component({
  selector: 'pos-frontend-stock-take',
  templateUrl: './stock-take.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StockTakeCountFormComponent],
})
export class StockTakeComponent {
  private readonly dialog = inject(MatDialog);
  private readonly injector = inject(Injector);
  private readonly productStore = inject(ProductStore);
  private readonly stockTakeStore = inject(StockTakeStore);

  protected readonly products = this.productStore.products;
  protected readonly batchProducts = this.stockTakeStore.batchProducts;
  protected readonly loading = this.stockTakeStore.getBatchProductsLoading;

  protected compare(batchNumber: number): void {
    this.stockTakeStore.getBatchProducts({ batchNumber });
    // Refresh the system counts so the variance is current.
    this.productStore.getAllProducts();
  }

  protected adjustStock(adjustment: AdjustStockRequest): void {
    this.dialog.open<StockAdjustmentComponent, AdjustStockRequest, boolean>(StockAdjustmentComponent, {
      width: '420px',
      data: adjustment,
      injector: this.injector,
    });
  }
}
