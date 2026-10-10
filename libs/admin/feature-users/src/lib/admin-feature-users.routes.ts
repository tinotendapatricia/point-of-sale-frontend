import { type Routes } from '@angular/router';

import { ListUsersComponent } from './list-users/list-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewUserRolesComponent } from './view-user-roles/view-user-roles.component';

export const ADMIN_FEATURE_USERS_ROUTES: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'view/:userId', component: ViewUserComponent },
  { path: 'view-user-authorities/:userId', component: ViewUserRolesComponent },
];
