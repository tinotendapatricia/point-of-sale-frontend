import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CREDITORS_FEATURE_KEY,
  CreditorsState,
  creditorsAdapter,
} from './creditors.reducer';

// Lookup the 'Creditors' feature state managed by NgRx
export const selectCreditorsState = createFeatureSelector<CreditorsState>(
  CREDITORS_FEATURE_KEY
);

const { selectAll, selectEntities } = creditorsAdapter.getSelectors();

export const selectCreditorsLoaded = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.loaded
);

export const selectCreditorsError = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.error
);

export const selectAllCreditors = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => selectAll(state)
);

export const selectCreditorsEntities = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.selectedId
);

export const getSelected = (creditorId: string | number) =>
  createSelector(selectCreditorsEntities, (entities) => entities[creditorId]);

export const getSelectedCreditor = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.selectedCreditor
);

export const getTotalCreditors = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.total
);

export const getCurrentPageState = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.currentPage
);

export const getCreditorsLoadingState = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.loading
);

export const getBtnState = createSelector(
  selectCreditorsState,
  (state: CreditorsState) => state.btnState
);
