import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromRoles from './+state/roles.reducer';
import { RolesEffects } from './+state/roles.effects';
import { RolesFacade } from './+state/roles.facade';

export function provideRolesDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromRoles.ROLES_FEATURE_KEY, fromRoles.rolesReducer),
    provideEffects(RolesEffects),
    RolesFacade,
  ];
}
