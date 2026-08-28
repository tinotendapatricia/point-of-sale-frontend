import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';
import { CurrencyFormComponent } from '../../../../../currencies/ui/src/lib/currency-form/currency-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-update-currency',
    templateUrl: './update-currency.component.html',
    styleUrls: ['./update-currency.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CurrencyFormComponent, AsyncPipe]
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
