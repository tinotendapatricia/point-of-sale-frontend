import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';

@Component({
    selector: 'pos-frontend-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, MatMenuModule, MatIconModule, MatButtonModule]
})
export class HeaderComponent {
  readonly authFacade = inject(AuthFacade);
  readonly currenciesService = inject(CurrenciesFacade);

  readonly defaultCurrency = toSignal(this.currenciesService.defaultCurrency$, { initialValue: undefined });

  constructor() {
    this.currenciesService.getDefaultCurrency();
  }
}
