import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GROUPS_FEATURE_KEY,
  GroupsState,
  groupsAdapter,
} from './groups.reducer';

// Lookup the 'Groups' feature state managed by NgRx
export const selectGroupsState =
  createFeatureSelector<GroupsState>(GROUPS_FEATURE_KEY);

const { selectAll, selectEntities } = groupsAdapter.getSelectors();

export const selectGroupsLoaded = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.loaded
);

export const selectGroupsError = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.error
);

export const selectAllGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => selectAll(state)
);

export const selectGroupsEntities = createSelector(
  selectGroupsState,
  (state: GroupsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectGroupsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelectedId = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.selectedId
);

export const getSelected = (groupId: string | number) =>
  createSelector(selectGroupsEntities, (entities) => entities[groupId]);

export const getSelectedGroup = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.selectedGroup
);

export const getTotalGroups = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.total
);

export const getCurrentPageState = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.currentPage
);

export const getGroupsLoadingState = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.loading
);

export const getBtnState = createSelector(
  selectGroupsState,
  (state: GroupsState) => state.btnState
);
