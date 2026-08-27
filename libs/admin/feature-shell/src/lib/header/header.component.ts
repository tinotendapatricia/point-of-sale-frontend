import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeaderComponent implements OnInit {
  constructor(
    public authFacade: AuthFacade,
    public currenciesService: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    this.currenciesService.getDefaultCurrency();
  }
}
