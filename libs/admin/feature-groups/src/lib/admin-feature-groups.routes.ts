import { Routes } from '@angular/router';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities/view-group-authorities.component';
import { provideGroupsDataAccess } from '@pos-frontend/groups/data-access';
import { provideRolesDataAccess } from '@pos-frontend/roles/data-access';

const providers = [provideGroupsDataAccess(), provideRolesDataAccess()];

export const ADMIN_FEATURE_GROUPS_ROUTES: Routes = [
  { path: '', component: ListGroupsComponent, providers },
  { path: 'view-group/:groupId', component: ViewGroupAuthoritiesComponent, providers },
];
