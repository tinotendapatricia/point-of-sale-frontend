import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectDrawerData, injectDrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';
import { type DebtorFormValue, DebtorsFormComponent } from '@pos-frontend/debtors/ui';

/** Drawer payload: the row being edited. */
export interface UpdateDebtorsData {
  debtor: DebtorsEntity;
}

/** Drawer content: edits the debtor passed in `DrawerConfig.data`. */
@Component({
  selector: 'pos-frontend-update-debtors',
  templateUrl: './update-debtors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DebtorsFormComponent],
})
export class UpdateDebtorsComponent {
  private readonly drawerRef = injectDrawerRef<boolean>();
  private readonly data = injectDrawerData<UpdateDebtorsData>();
  private readonly debtorStore = inject(DebtorStore);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly debtor = this.data.debtor;
  protected readonly currencies = this.currencyStore.currencies;
  protected readonly submitting = this.debtorStore.updateLoading;

  constructor() {
    this.currencyStore.getAllCurrencies();
  }

  protected update(value: DebtorFormValue): void {
    this.debtorStore.updateDebtor({
      data: { ...value, id: this.debtor.id },
      callback: () => this.close(true),
    });
  }

  protected close(updated: boolean): void {
    this.drawerRef.close(updated);
  }
}
