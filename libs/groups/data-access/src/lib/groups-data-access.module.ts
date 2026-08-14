import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGroups from './+state/groups.reducer';
import { GroupsEffects } from './+state/groups.effects';
import { GroupsFacade } from './+state/groups.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromGroups.GROUPS_FEATURE_KEY,
      fromGroups.groupsReducer
    ),
    EffectsModule.forFeature([GroupsEffects]),
  ],
  providers: [GroupsFacade],
})
export class GroupsDataAccessModule {}
