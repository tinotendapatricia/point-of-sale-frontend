import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ClrNavigationModule } from '@clr/angular/layout/nav';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrIfOpen, ClrPopoverContent } from '@clr/angular/popover/common';
import { ClrDropdownModule } from '@clr/angular/popover/dropdown';
import { ClrIcon, ClrIconModule } from '@clr/angular/icon';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'pos-frontend-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ClrNavigationModule, ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrDropdownModule, ClrIcon, ClrIconModule, ClrIfOpen, ClrPopoverContent, RouterLinkActive, RouterLink, AsyncPipe]
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
