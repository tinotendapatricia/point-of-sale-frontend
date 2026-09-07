import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatagridState } from '@pos-frontend/shared/utils';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CurrenciesListUiComponent } from '@pos-frontend/currencies/ui';
import { MakeDefaultComponent } from '../make-default/make-default.component';
import { CreateCurrencyComponent } from '../create-currency/create-currency.component';
import { UpdateRateComponent } from '../update-rate/update-rate.component';
import { UpdateCurrencyComponent } from '../update-currency/update-currency.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-currencies-list',
    templateUrl: './currencies-list.component.html',
    styleUrls: ['./currencies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIconModule, CurrenciesListUiComponent, AsyncPipe]
})
export class CurrenciesListComponent {
  private readonly dialog = inject(MatDialog);

  constructor(
    public currenciesFacade: CurrenciesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public getCurrencyList(state: DatagridState) {
    this.currenciesFacade.getPaginatedCurrencies(state);
  }

  refresh() {
    this.getCurrencyList({});
  }

  updateCurrency(currency: CurrenciesEntity) {
    this.dialog
      .open(UpdateCurrencyComponent, { width: '480px', data: { currency } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  createCurrency() {
    this.dialog
      .open(CreateCurrencyComponent, { width: '480px' })
      .afterClosed()
      .subscribe((created) => created && this.refresh());
  }

  viewCurrency(currency: CurrenciesEntity) {
    this.router.navigate(['./currency-details', currency.id], {
      relativeTo: this.route,
    });
  }

  makeDefaultCurrency(currency: CurrenciesEntity) {
    this.dialog
      .open(MakeDefaultComponent, { width: '420px', data: { currency } })
      .afterClosed()
      .subscribe((changed) => changed && this.refresh());
  }

  updateRate(currency: CurrenciesEntity) {
    this.dialog
      .open(UpdateRateComponent, { width: '420px', data: { currency } })
      .afterClosed()
      .subscribe((updated) => updated && this.refresh());
  }

  viewCurrencyAuthorities(currencyId: any) {
    this.router.navigate(['./view-currency', currencyId], {
      relativeTo: this.route,
    });
  }
}
