import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { getStationNumber } from '@pos-frontend/pos/data-access';
import { UserStore } from '@pos-frontend/users/data-access';

@Component({
  selector: 'pos-frontend-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  private readonly userStore = inject(UserStore);

  protected readonly station = getStationNumber();
  protected readonly userName = computed(() => this.userStore.profile()?.name);

  constructor() {
    this.userStore.getUserProfile();
  }

  protected logout(): void {
    this.authStore.logout();
  }
}
