import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DEBTORS_FEATURE_KEY,
  DebtorsState,
  debtorsAdapter,
} from './debtors.reducer';

// Lookup the 'Debtors' feature state managed by NgRx
export const selectDebtorsState =
  createFeatureSelector<DebtorsState>(DEBTORS_FEATURE_KEY);

const { selectAll, selectEntities } = debtorsAdapter.getSelectors();

export const selectDebtorsLoaded = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.loaded
);

export const selectDebtorsError = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.error
);

export const selectAllDebtors = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => selectAll(state)
);

export const selectDebtorsEntities = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.selectedId
);

export const getSelected = (debtorId: string | number) =>
  createSelector(selectDebtorsEntities, (entities) => entities[debtorId]);

export const getSelectedDebtor = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.selectedDebtor
);

export const getTotalDebtors = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.total
);

export const getCurrentPageState = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.currentPage
);

export const getDebtorsLoadingState = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.loading
);

export const getBtnState = createSelector(
  selectDebtorsState,
  (state: DebtorsState) => state.btnState
);
