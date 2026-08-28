import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { UpdateGroupComponent } from './update-group/update-group.component';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { GroupsDataAccessModule } from '@pos-frontend/groups/data-access';
import { GroupsUiModule } from '@pos-frontend/groups/ui';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  plusCircleIcon,
  pencilIcon,
  minusCircleIcon,
} from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities/view-group-authorities.component';
import { RolesDataAccessModule } from '@pos-frontend/roles/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);

@NgModule({
    imports: [
        CommonModule,
        GroupsDataAccessModule,
        GroupsUiModule,
        RolesDataAccessModule,
        MatCardModule,
        ClarityModule,
        RouterModule.forChild([
            { path: '', component: ListGroupsComponent },
            { path: 'view-group/:groupId', component: ViewGroupAuthoritiesComponent },
        ]),
        CreateGroupComponent,
        ListGroupsComponent,
        UpdateGroupComponent,
        DeleteGroupComponent,
        ViewGroupAuthoritiesComponent,
    ],
})
export class AdminFeatureGroupsModule {}
