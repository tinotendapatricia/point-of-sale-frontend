import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrenciesEntity, CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { CurrencyFormComponent } from '@pos-frontend/currencies/ui';

export interface UpdateCurrencyData {
  currency: CurrenciesEntity;
}

@Component({
    selector: 'pos-frontend-update-currency',
    templateUrl: './update-currency.component.html',
    styleUrls: ['./update-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CurrencyFormComponent]
})
export class UpdateCurrencyComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateCurrencyComponent, boolean>);
  private readonly data = inject<UpdateCurrencyData>(MAT_DIALOG_DATA);
  readonly currenciesService = inject(CurrenciesFacade);

  readonly currency = this.data.currency;
  readonly submitting = signal(false);

  public createCurrency(currency: any) {
    this.submitting.set(true);
    this.currenciesService.updateCurrency(currency);
    this.currenciesService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}
