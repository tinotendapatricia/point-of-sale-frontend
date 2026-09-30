import { type Routes } from '@angular/router';

import { ListGroupsComponent } from './list-groups/list-groups.component';
import { ViewGroupAuthoritiesComponent } from './view-group-authorities/view-group-authorities.component';

export const ADMIN_FEATURE_GROUPS_ROUTES: Routes = [
  { path: '', component: ListGroupsComponent },
  { path: 'view-group/:groupId', component: ViewGroupAuthoritiesComponent },
];
