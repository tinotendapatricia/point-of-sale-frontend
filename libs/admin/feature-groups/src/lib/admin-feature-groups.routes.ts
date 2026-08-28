import { Routes } from '@angular/router';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities/view-group-authorities.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, plusCircleIcon, pencilIcon, minusCircleIcon } from '@cds/core/icon';
import { provideGroupsDataAccess } from '@pos-frontend/groups/data-access';
import { provideRolesDataAccess } from '@pos-frontend/roles/data-access';

ClarityIcons.addIcons(plusCircleIcon, pencilIcon, minusCircleIcon);

const providers = [provideGroupsDataAccess(), provideRolesDataAccess()];

export const ADMIN_FEATURE_GROUPS_ROUTES: Routes = [
  { path: '', component: ListGroupsComponent, providers },
  { path: 'view-group/:groupId', component: ViewGroupAuthoritiesComponent, providers },
];
