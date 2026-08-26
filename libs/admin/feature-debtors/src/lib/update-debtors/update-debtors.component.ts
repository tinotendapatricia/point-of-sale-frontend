import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsEntity, DebtorsFacade } from '@pos-frontend/debtors/data-access';

@Component({
    selector: 'pos-frontend-update-debtors',
    templateUrl: './update-debtors.component.html',
    styleUrls: ['./update-debtors.component.scss'],
    standalone: false
})
export class UpdateDebtorsComponent {

  @Output() closeModal = new EventEmitter();
  @Input() debtor!:DebtorsEntity
  constructor(
    public debtorsService: DebtorsFacade,
    private router: Router,
    public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    this.currenciesFacade.getAllCurrencies();
  }

  public createDebtor(debtor: any) {
    this.debtorsService.updateDebtor(debtor);
    this.debtorsService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
