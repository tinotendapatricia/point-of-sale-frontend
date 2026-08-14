import { createFeatureSelector, createSelector } from '@ngrx/store';
import { POS_FEATURE_KEY, PosState, posAdapter } from './pos.reducer';

// Lookup the 'Pos' feature state managed by NgRx
export const selectPosState = createFeatureSelector<PosState>(POS_FEATURE_KEY);

const { selectAll, selectEntities } = posAdapter.getSelectors();

export const selectPosLoaded = createSelector(
  selectPosState,
  (state: PosState) => state.loaded
);

export const selectPosError = createSelector(
  selectPosState,
  (state: PosState) => state.error
);

export const selectAllPos = createSelector(selectPosState, (state: PosState) =>
  selectAll(state)
);

export const selectPosEntities = createSelector(
  selectPosState,
  (state: PosState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectPosState,
  (state: PosState) => state.selectedId
);

export const getSelectedId = createSelector(
  selectPosState,
  (state: PosState) => state.selectedId
);

export const getSelected = (posId: string | number) =>
  createSelector(selectPosEntities, (entities) => entities[posId]);

export const getSelectedPos = createSelector(
  selectPosState,
  (state: PosState) => state.selectedPos
);

export const getTotalPos = createSelector(
  selectPosState,
  (state: PosState) => state.total
);

export const getCurrentPageState = createSelector(
  selectPosState,
  (state: PosState) => state.currentPage
);

export const getPosLoadingState = createSelector(
  selectPosState,
  (state: PosState) => state.loading
);

export const getBtnState = createSelector(
  selectPosState,
  (state: PosState) => state.btnState
);
