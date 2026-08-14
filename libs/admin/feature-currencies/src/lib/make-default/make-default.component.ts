import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  CurrenciesEntity,
  CurrenciesFacade,
} from '@pos-frontend/currencies/data-access';

@Component({
  selector: 'pos-frontend-make-default',
  templateUrl: './make-default.component.html',
  styleUrls: ['./make-default.component.scss'],
})
export class MakeDefaultComponent implements OnInit {
  @Input() currency!: CurrenciesEntity;
  message = '';
  @Output() closeModal = new EventEmitter();
  constructor(
    public currenciesService: CurrenciesFacade,
    private router: Router // public currenciesFacade: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    this.message = ` Are you sure you want to make ${this.currency.code} the default system currency?`;
  }

  public onSubmit() {

    this.currenciesService.makeDefault(this.currency);
    this.currenciesService.loaded$.subscribe((res) => {
      res ? this.closeModal.emit(true) : null;
    });
  }
}
