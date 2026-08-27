import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesEntity, CurrenciesFacade } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-update-rate',
    templateUrl: './update-rate.component.html',
    styleUrls: ['./update-rate.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UpdateRateComponent {
  @Input() currency!:CurrenciesEntity
  @Output() closeModal = new EventEmitter();
  constructor(
    public currenciesService: CurrenciesFacade,
    private router: Router // public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    // this.currenciesFacade.getAllCurrencies();
  }

  public updateRate(rateDetails: any) {
    rateDetails.id = this.currency.id
    this.currenciesService.updateRate(rateDetails);
    this.currenciesService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
