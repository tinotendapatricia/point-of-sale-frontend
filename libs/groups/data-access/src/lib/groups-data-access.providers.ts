import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromGroups from './+state/groups.reducer';
import { GroupsEffects } from './+state/groups.effects';
import { GroupsFacade } from './+state/groups.facade';

export function provideGroupsDataAccess(): (Provider | EnvironmentProviders)[] {
  return [
    provideState(fromGroups.GROUPS_FEATURE_KEY, fromGroups.groupsReducer),
    provideEffects(GroupsEffects),
    GroupsFacade,
  ];
}
