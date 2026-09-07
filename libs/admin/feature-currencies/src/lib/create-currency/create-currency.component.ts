import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { CurrencyFormComponent } from '@pos-frontend/currencies/ui';

@Component({
    selector: 'pos-frontend-create-currency',
    templateUrl: './create-currency.component.html',
    styleUrls: ['./create-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CurrencyFormComponent]
})
export class CreateCurrencyComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateCurrencyComponent, boolean>);
  readonly currenciesService = inject(CurrenciesFacade);

  readonly submitting = signal(false);

  public createCurrency(currency: any) {
    this.submitting.set(true);
    this.currenciesService.createNewCurrency(currency);
    this.currenciesService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}
