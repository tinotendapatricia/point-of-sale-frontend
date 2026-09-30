import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import {
  CurrencyFormComponent,
  type CurrencyFormValue,
} from '@pos-frontend/currencies/ui';

@Component({
  selector: 'pos-frontend-create-currency',
  templateUrl: './create-currency.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyFormComponent],
})
export class CreateCurrencyComponent {
  private readonly router = inject(Router);
  // null on the routed /currencies/new page; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly submitting = this.currencyStore.createLoading;

  protected create(value: CurrencyFormValue): void {
    this.currencyStore.createCurrency({
      data: { ...value, isDefault: false },
      callback: () => this.close(true),
    });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/currencies']);
    }
  }
}
