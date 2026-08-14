import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VAT_FEATURE_KEY, VatState, vatAdapter } from './vat.reducer';

// Lookup the 'Vat' feature state managed by NgRx
export const selectVatState = createFeatureSelector<VatState>(VAT_FEATURE_KEY);

const { selectAll, selectEntities } = vatAdapter.getSelectors();

export const selectVatLoaded = createSelector(
  selectVatState,
  (state: VatState) => state.loaded
);

export const selectVatError = createSelector(
  selectVatState,
  (state: VatState) => state.error
);

export const selectAllVat = createSelector(selectVatState, (state: VatState) =>
  selectAll(state)
);

export const selectVatEntities = createSelector(
  selectVatState,
  (state: VatState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectVatState,
  (state: VatState) => state.selectedId
);

export const selectEntity = createSelector(
  selectVatEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
export const getSelectedId = createSelector(
  selectVatState,
  (state: VatState) => state.selectedId
);

export const getSelected = (vatId: string | number) =>
  createSelector(selectVatEntities, (entities) => entities[vatId]);

export const getSelectedVat = createSelector(
  selectVatState,
  (state: VatState) => state.selectedVat
);

export const getTotalVat = createSelector(
  selectVatState,
  (state: VatState) => state.total
);

export const getCurrentPageState = createSelector(
  selectVatState,
  (state: VatState) => state.currentPage
);

export const getVatLoadingState = createSelector(
  selectVatState,
  (state: VatState) => state.loading
);

export const getBtnState = createSelector(
  selectVatState,
  (state: VatState) => state.btnState
);
