import { type Routes } from '@angular/router';

import { ListRolesComponent } from './list-roles/list-roles.component';

// RoleStore is root-provided, so no route-level providers are needed.
export const ADMIN_FEATURE_ROLES_ROUTES: Routes = [{ path: '', component: ListRolesComponent }];
