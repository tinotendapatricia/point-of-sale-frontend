import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClrDatagridStateInterface } from '@clr/angular';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-currencies-list',
    templateUrl: './currencies-list.component.html',
    styleUrls: ['./currencies-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CurrenciesListComponent implements OnInit, AfterViewChecked {
  public isUpdate = false;
  public isUpdateRate = false;
  public isCreate = false;
  public isChangeStatus = false;
  public selectedCurrency!: CurrenciesEntity;
  isMakeDefault = false;

  constructor(
    public currenciesFacade: CurrenciesFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  public getCurrencyList(state: ClrDatagridStateInterface) {
    this.currenciesFacade.getPaginatedCurrencies(state);
  }

  refresh() {
    this.isUpdate = false;
    this.isCreate = false;
    this.isChangeStatus = false;
    this.isMakeDefault = false;
    this.isUpdateRate = false;
    this.getCurrencyList({});
  }

  updateCurrency(currency: CurrenciesEntity) {
    this.selectedCurrency = currency;
    this.isUpdate = true;
  }

  viewCurrency(currency: CurrenciesEntity) {
    this.router.navigate(['./currency-details', currency.id], {
      relativeTo: this.route,
    });
  }

  changeCurrenciestatus(currency: CurrenciesEntity) {
    this.selectedCurrency = currency;
    this.isChangeStatus = true;
  }

  makeDefaultCurrency(currency: CurrenciesEntity) {
    this.selectedCurrency = currency;
    this.isMakeDefault = true;
  }

  updateRate(currency: CurrenciesEntity) {
    this.selectedCurrency = currency;
    this.isUpdateRate = true;
  }

  viewCurrencyAuthorities(currencyId: any) {
    this.router.navigate(['./view-currency', currencyId], {
      relativeTo: this.route,
    });
  }
}
