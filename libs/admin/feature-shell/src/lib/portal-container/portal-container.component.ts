import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-portal-container',
    templateUrl: './portal-container.component.html',
    styleUrls: ['./portal-container.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PortalContainerComponent implements OnInit {
  constructor(
    public authFacade: AuthFacade,
    public currenciesService: CurrenciesFacade
  ) {}

  ngOnInit(): void {
    this.currenciesService.getDefaultCurrency();
  }
}
