import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { ViewUserRolesComponent } from './view-user-roles/view-user-roles.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, syncIcon } from '@cds/core/icon';
import { provideUsersDataAccess } from '@pos-frontend/users/data-access';
import { provideRolesDataAccess } from '@pos-frontend/roles/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, syncIcon);

const providers = [provideUsersDataAccess(), provideRolesDataAccess()];

export const ADMIN_FEATURE_USERS_ROUTES: Routes = [
  { path: '', component: ListUsersComponent, providers },
  {
    path: 'view-user-authorities/:userId',
    component: ViewUserRolesComponent,
    providers,
  },
];
