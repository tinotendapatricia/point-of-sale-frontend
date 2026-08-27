import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';

@Component({
    selector: 'pos-frontend-create-debtors',
    templateUrl: './create-debtors.component.html',
    styleUrls: ['./create-debtors.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CreateDebtorsComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  constructor(
    public debtorsService: DebtorsFacade,
    private router: Router,
    public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    this.currenciesFacade.getAllCurrencies();
  }

  public createDebtor(debtor: any) {
    this.debtorsService.createNewDebtor(debtor);
    this.debtorsService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
