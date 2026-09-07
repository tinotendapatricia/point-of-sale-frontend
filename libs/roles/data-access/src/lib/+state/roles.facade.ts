import { Injectable, inject } from '@angular/core';
import { DatagridState } from '@pos-frontend/shared/utils';
import { select, Store, Action } from '@ngrx/store';

import * as RolesActions from './roles.actions';
import { RolesEntity } from './roles.models';
import * as RolesFeature from './roles.reducer';
import * as RolesSelectors from './roles.selectors';

@Injectable()
export class RolesFacade {
  loaded$ = this.store.pipe(select(RolesSelectors.selectRolesLoaded));
  allRoles$ = this.store.pipe(select(RolesSelectors.selectAllRoles));
  selectedRole$ = this.store.pipe(select(RolesSelectors.getSelectedRole));
  loading$ = this.store.pipe(select(RolesSelectors.getRolesLoadingState));
  totalRoles$ = this.store.pipe(select(RolesSelectors.getTotalRoles));
  btnState$ = this.store.pipe(select(RolesSelectors.getBtnState));

  constructor(private store: Store<RolesFeature.RolesPartialState>) {}

  getPaginatedRoles(state: DatagridState) {
    this.store.dispatch(RolesActions.getPaginatedRoles({ state }));
  }

  getAllRoles() {
    this.store.dispatch(RolesActions.getAllRoles());
  }

  getRole(roleId: string | number) {
    this.store.dispatch(RolesActions.getRoleById({ roleId }));
  }

  createNewRole(role: RolesEntity) {
    this.store.dispatch(RolesActions.createRole(role));
  }

  updateRole(role: RolesEntity) {
    this.store.dispatch(RolesActions.updateRole(role));
  }
}
