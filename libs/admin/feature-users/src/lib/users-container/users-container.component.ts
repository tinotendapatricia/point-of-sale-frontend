import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { ListUsersComponent } from '../list-users/list-users.component';
import { ListUsersByGroupComponent } from '../list-users-by-group/list-users-by-group.component';

@Component({
  selector: 'pos-frontend-users-container',
  templateUrl: './users-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, MatCardModule, ListUsersComponent, ListUsersByGroupComponent],
})
export class UsersContainerComponent {}
