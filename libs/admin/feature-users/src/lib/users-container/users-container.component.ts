import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { ListUsersComponent } from '../list-users/list-users.component';
import { ListUsersByGroupComponent } from '../list-users-by-group/list-users-by-group.component';

@Component({
  selector: 'pos-frontend-users-container',
  templateUrl: './users-container.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./users-container.component.scss'],
  imports: [MatTabsModule, MatCardModule, ListUsersComponent, ListUsersByGroupComponent],
})
export class UsersContainerComponent {}
