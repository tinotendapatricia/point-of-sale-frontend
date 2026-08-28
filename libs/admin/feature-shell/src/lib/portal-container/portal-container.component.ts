import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ClrMainContainerModule } from '@clr/angular/layout/main-container';
import { ClrNavigationModule } from '@clr/angular/layout/nav';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'pos-frontend-portal-container',
    templateUrl: './portal-container.component.html',
    styleUrls: ['./portal-container.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrMainContainerModule, ClrNavigationModule, HeaderComponent, SideNavComponent, RouterOutlet]
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
