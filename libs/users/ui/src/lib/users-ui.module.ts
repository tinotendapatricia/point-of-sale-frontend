import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersUiComponent } from './list-users-ui/list-users-ui.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ClarityModule } from '@clr/angular';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
} from '@cds/core/icon';

import { RouterModule } from '@angular/router';
import { UserRolesFormComponent } from './user-roles-form/user-roles-form.component';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);

@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        ListUsersUiComponent,
        UserFormComponent,
        UserRolesFormComponent,
    ],
    exports: [
        ListUsersUiComponent,
        UserFormComponent,
        UserRolesFormComponent,
    ],
})
export class UsersUiModule {}
