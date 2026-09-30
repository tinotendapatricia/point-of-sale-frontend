import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserStore } from '@pos-frontend/users/data-access';
import { UserDetailsComponent } from '@pos-frontend/users/ui';

@Component({
  selector: 'pos-frontend-view-user',
  templateUrl: './view-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, UserDetailsComponent],
})
export class ViewUserComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly userStore = inject(UserStore);

  protected readonly user = this.userStore.user;
  protected readonly loading = this.userStore.getOneLoading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('userId');
    if (id) {
      this.userStore.getUser({ id });
    }
  }
}
