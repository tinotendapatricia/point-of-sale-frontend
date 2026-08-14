import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';

@Component({
  selector: 'pos-frontend-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.scss'],
})
export class CreateCurrencyComponent {
  @Output() closeModal = new EventEmitter();
  constructor(
    public currenciesService: CurrenciesFacade,
    private router: Router // public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    // this.currenciesFacade.getAllCurrencies();
  }

  public createCurrency(currency: any) {
    this.currenciesService.createNewCurrency(currency);
    this.currenciesService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
