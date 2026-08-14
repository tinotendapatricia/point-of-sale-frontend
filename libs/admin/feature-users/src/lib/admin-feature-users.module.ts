import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDataAccessModule } from '@pos-frontend/users/data-access';
import { UsersUiModule } from '@pos-frontend/users/ui';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
  syncIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ViewUserRolesComponent } from './view-user-roles/view-user-roles.component';
import { RolesDataAccessModule } from '@pos-frontend/roles/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, syncIcon);

@NgModule({
  imports: [
    CommonModule,
    UsersDataAccessModule,
    MatCardModule,
    UsersUiModule,
    RolesDataAccessModule,
    ClarityModule,
    RouterModule.forChild([
      { path: '', component: ListUsersComponent },
      {
        path: 'view-user-authorities/:userId',
        component: ViewUserRolesComponent,
      },
    ]),
  ],
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    UpdateUserComponent,
    ViewUserRolesComponent,
  ],
})
export class AdminFeatureUsersModule {}
