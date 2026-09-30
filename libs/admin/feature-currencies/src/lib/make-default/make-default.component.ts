import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  type CurrencyEntity,
  CurrencyStore,
} from '@pos-frontend/currencies/data-access';
import { ActionConfirmationFormComponent } from '@pos-frontend/shared/ui';

export interface MakeDefaultData {
  currency: CurrencyEntity;
}

/** Confirmation dialog: opened through MatDialog from the currencies list. */
@Component({
  selector: 'pos-frontend-make-default',
  templateUrl: './make-default.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActionConfirmationFormComponent],
})
export class MakeDefaultComponent {
  private readonly dialogRef =
    inject<MatDialogRef<MakeDefaultComponent, boolean>>(MatDialogRef);
  private readonly data = inject<MakeDefaultData>(MAT_DIALOG_DATA);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly submitting = this.currencyStore.makeDefaultLoading;
  protected readonly message = `Are you sure you want to make ${this.data.currency.code} the default system currency?`;

  protected confirm(): void {
    this.currencyStore.makeDefault({
      data: { id: this.data.currency.id },
      callback: () => this.dialogRef.close(true),
    });
  }
}
