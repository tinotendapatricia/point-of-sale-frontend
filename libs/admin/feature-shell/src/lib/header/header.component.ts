import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';

@Component({
  selector: 'pos-frontend-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ RouterLink, MatMenuModule, MatIconModule, MatButtonModule],
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  protected readonly currencyStore = inject(CurrencyStore);

  constructor() {
    this.currencyStore.getDefaultCurrency();
  }

  protected logout(): void {
    this.authStore.logout();
  }
}
