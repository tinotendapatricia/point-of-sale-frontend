import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { type CashupRequest, ReportStore } from '@pos-frontend/reports/data-access';
import { CashupFormComponent } from '@pos-frontend/reports/ui';

@Component({
  selector: 'pos-frontend-till-cashup-report',
  templateUrl: './till-cashup-report.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, CashupFormComponent],
})
export class TillCashupReportComponent {
  private readonly reportStore = inject(ReportStore);
  private readonly currencyStore = inject(CurrencyStore);
  private readonly configurationStore = inject(ConfigurationStore);

  protected readonly loading = this.reportStore.cashupLoading;
  protected readonly currencies = this.currencyStore.currencies;
  protected readonly tills = this.configurationStore.pendingCashups;

  constructor() {
    this.currencyStore.getAllCurrencies();
    this.configurationStore.getPendingCashups();
  }

  protected generate(cashup: CashupRequest): void {
    this.reportStore.generateCashup(cashup);
  }
}
