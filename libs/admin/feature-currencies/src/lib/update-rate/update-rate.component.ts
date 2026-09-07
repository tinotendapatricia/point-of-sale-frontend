import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrenciesEntity, CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { RateFormComponent } from '@pos-frontend/currencies/ui';

export interface UpdateRateData {
  currency: CurrenciesEntity;
}

@Component({
    selector: 'pos-frontend-update-rate',
    templateUrl: './update-rate.component.html',
    styleUrls: ['./update-rate.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RateFormComponent]
})
export class UpdateRateComponent {
  private readonly dialogRef = inject(MatDialogRef<UpdateRateComponent, boolean>);
  private readonly data = inject<UpdateRateData>(MAT_DIALOG_DATA);
  readonly currenciesService = inject(CurrenciesFacade);

  private readonly currency = this.data.currency;
  readonly submitting = signal(false);

  public updateRate(rateDetails: any) {
    rateDetails.id = this.currency.id;
    this.submitting.set(true);
    this.currenciesService.updateRate(rateDetails);
    this.currenciesService.loaded$.pipe(take(1)).subscribe((loaded) => {
      this.submitting.set(false);
      if (loaded) {
        this.dialogRef.close(true);
      }
    });
  }
}
