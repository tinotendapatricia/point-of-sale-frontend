import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROLES_FEATURE_KEY, RolesState, rolesAdapter } from './roles.reducer';

// Lookup the 'Roles' feature state managed by NgRx
export const selectRolesState =
  createFeatureSelector<RolesState>(ROLES_FEATURE_KEY);

const { selectAll, selectEntities } = rolesAdapter.getSelectors();

export const selectRolesLoaded = createSelector(
  selectRolesState,
  (state: RolesState) => state.loaded
);

export const selectRolesError = createSelector(
  selectRolesState,
  (state: RolesState) => state.error
);

export const selectAllRoles = createSelector(
  selectRolesState,
  (state: RolesState) => selectAll(state)
);

export const selectRolesEntities = createSelector(
  selectRolesState,
  (state: RolesState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectRolesState,
  (state: RolesState) => state.selectedId
);

export const getSelected = (roleId: string | number) =>
  createSelector(selectRolesEntities, (entities) => entities[roleId]);

export const getSelectedRole = createSelector(
  selectRolesState,
  (state: RolesState) => state.selectedRole
);

export const getTotalRoles = createSelector(
  selectRolesState,
  (state: RolesState) => state.total
);

export const getRolesLoadingState = createSelector(
  selectRolesState,
  (state: RolesState) => state.loading
);

export const getBtnState = createSelector(
  selectRolesState,
  (state: RolesState) => state.btnState
);

export const getCurrentPageState = createSelector(
  selectRolesState,
  (state: RolesState) => state.currentPage
);
