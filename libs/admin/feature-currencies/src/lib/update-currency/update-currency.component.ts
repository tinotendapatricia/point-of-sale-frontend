import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import {
  CurrencyFormComponent,
  type CurrencyFormValue,
} from '@pos-frontend/currencies/ui';

@Component({
  selector: 'pos-frontend-update-currency',
  templateUrl: './update-currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardContent, CurrencyFormComponent],
})
export class UpdateCurrencyComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly currencyStore = inject(CurrencyStore);

  protected readonly submitting = this.currencyStore.updateLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('currencyId');
    if (id) {
      this.currencyStore.getCurrency({ id });
    }
  }

  protected update(value: CurrencyFormValue): void {
    const current = this.currencyStore.currency();
    if (!current) {
      return;
    }
    this.currencyStore.updateCurrency({
      data: { ...current, ...value },
      callback: () => void this.router.navigate(['/currencies']),
    });
  }

  protected cancel(): void {
    void this.router.navigate(['/currencies']);
  }
}
