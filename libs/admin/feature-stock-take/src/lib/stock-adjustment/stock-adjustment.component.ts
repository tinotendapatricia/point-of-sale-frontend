import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';
import { type AdjustStockRequest, StockTakeStore } from '@pos-frontend/stock-take/data-access';

/** Opened through `MatDialog`; adjusts the stock and returns to the dashboard. */
@Component({
  selector: 'pos-frontend-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class StockAdjustmentComponent {
  private readonly router = inject(Router);
  private readonly dialogRef = inject<MatDialogRef<StockAdjustmentComponent, boolean>>(MatDialogRef);
  private readonly stockTakeStore = inject(StockTakeStore);
  private readonly adjustment = inject<AdjustStockRequest>(MAT_DIALOG_DATA);

  protected readonly submitting = this.stockTakeStore.adjustLoading;

  protected adjustStock(): void {
    this.stockTakeStore.adjustStock({
      data: this.adjustment,
      callback: () => {
        this.dialogRef.close(true);
        void this.router.navigate(['/dashboard']);
      },
    });
  }
}
