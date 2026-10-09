import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { getStationNumber } from '@pos-frontend/pos/data-access';
import { UserStore } from '@pos-frontend/users/data-access';

/** Till top bar: brand, sale/refund switch, station, cashier and logout. */
@Component({
  selector: 'pos-frontend-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);
  private readonly currencyStore = inject(CurrencyStore);

  protected readonly station = getStationNumber();
  protected readonly userName = computed(() => this.userStore.profile()?.name);
  protected readonly currencyCode = computed(
    () => this.currencyStore.defaultCurrency()?.code
  );

  constructor() {
    this.userStore.getUserProfile();
  }

  protected logout(): void {
    this.authStore.logout();
  }
}
