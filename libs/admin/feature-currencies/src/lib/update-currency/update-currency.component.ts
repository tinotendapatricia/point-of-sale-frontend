import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';

@Component({
  selector: 'pos-frontend-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.scss'],
})
export class UpdateCurrencyComponent {
  @Input() currency!: CurrenciesEntity;
  @Output() closeModal = new EventEmitter();
  constructor(
    public currenciesService: CurrenciesFacade,
    private router: Router // public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    // this.currenciesFacade.getAllCurrencies();
  }

  public createCurrency(currency: any) {
    this.currenciesService.updateCurrency(currency);
    this.currenciesService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
