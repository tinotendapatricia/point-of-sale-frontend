import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { injectDrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { type DebtorFormValue, DebtorsFormComponent } from '@pos-frontend/debtors/ui';

@Component({
  selector: 'pos-frontend-create-debtors',
  templateUrl: './create-debtors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DebtorsFormComponent],
})
export class CreateDebtorsComponent {
  private readonly router = inject(Router);
  // null when rendered outside a drawer; present when opened through DrawerService.
  private readonly drawerRef = injectDrawerRef<boolean>({ optional: true });
  private readonly debtorStore = inject(DebtorStore);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly currencies = this.currencyStore.currencies;
  protected readonly submitting = this.debtorStore.createLoading;

  constructor() {
    this.currencyStore.getAllCurrencies();
  }

  protected create(value: DebtorFormValue): void {
    this.debtorStore.createDebtor({ data: value, callback: () => this.close(true) });
  }

  protected close(created: boolean): void {
    if (this.drawerRef) {
      this.drawerRef.close(created);
    } else {
      void this.router.navigate(['/debtors']);
    }
  }
}
