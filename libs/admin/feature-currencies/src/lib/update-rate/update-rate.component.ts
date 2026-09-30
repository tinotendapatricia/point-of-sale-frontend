import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';
import {
  type CurrencyEntity,
  CurrencyStore,
} from '@pos-frontend/currencies/data-access';
import { RateFormComponent, type RateFormValue } from '@pos-frontend/currencies/ui';

export interface UpdateRateData {
  currency: CurrencyEntity;
}

/** Drawer content: opened from the currencies list with the row as data. */
@Component({
  selector: 'pos-frontend-update-rate',
  templateUrl: './update-rate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RateFormComponent],
})
export class UpdateRateComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly data = injectDrawerData<UpdateRateData>();
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly submitting = this.currencyStore.updateRateLoading;

  protected update(value: RateFormValue): void {
    this.currencyStore.updateRate({
      data: { ...value, id: this.data.currency.id },
      callback: () => this.drawerRef.close(true),
    });
  }

  protected cancel(): void {
    this.drawerRef.close(false);
  }
}
