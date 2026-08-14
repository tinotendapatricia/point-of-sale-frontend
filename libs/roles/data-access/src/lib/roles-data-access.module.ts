import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRoles from './+state/roles.reducer';
import { RolesEffects } from './+state/roles.effects';
import { RolesFacade } from './+state/roles.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromRoles.ROLES_FEATURE_KEY, fromRoles.rolesReducer),
    EffectsModule.forFeature([RolesEffects]),
  ],
  providers: [RolesFacade],
})
export class RolesDataAccessModule {}
