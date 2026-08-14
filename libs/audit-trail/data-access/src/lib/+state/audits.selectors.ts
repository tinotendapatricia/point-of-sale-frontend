import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUDITS_FEATURE_KEY,
  AuditsState,
  auditsAdapter,
} from './audits.reducer';

// Lookup the 'Audits' feature state managed by NgRx
export const selectAuditsState =
  createFeatureSelector<AuditsState>(AUDITS_FEATURE_KEY);

const { selectAll, selectEntities } = auditsAdapter.getSelectors();

export const selectAuditsLoaded = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.loaded
);

export const selectAuditsError = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.error
);

export const selectAllAudits = createSelector(
  selectAuditsState,
  (state: AuditsState) => selectAll(state)
);

export const selectAuditsEntities = createSelector(
  selectAuditsState,
  (state: AuditsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAuditsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const getSelected = (auditId: string | number) =>
  createSelector(selectAuditsEntities, (entities) => entities[auditId]);

export const getSelectedAudit = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.selectedAudit
);

export const getTotalAudits = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.total
);

export const getCurrentPageState = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.currentPage
);

export const getAuditsLoadingState = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.loading
);

export const getBtnState = createSelector(
  selectAuditsState,
  (state: AuditsState) => state.btnState
);