import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';
import { type AddProductsToBatchRequest, StockTakeStore } from '@pos-frontend/stock-take/data-access';

/** Opened through `MatDialog`; closes with `true` once the products are saved to the batch. */
@Component({
  selector: 'pos-frontend-close-batch',
  templateUrl: './close-batch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class CloseBatchComponent {
  private readonly dialogRef = inject<MatDialogRef<CloseBatchComponent, boolean>>(MatDialogRef);
  private readonly stockTakeStore = inject(StockTakeStore);
  private readonly batch = inject<AddProductsToBatchRequest>(MAT_DIALOG_DATA);

  protected readonly submitting = this.stockTakeStore.addProductsLoading;

  protected closeBatch(): void {
    this.stockTakeStore.addProductsToBatch({
      data: this.batch,
      callback: () => this.dialogRef.close(true),
    });
  }
}
