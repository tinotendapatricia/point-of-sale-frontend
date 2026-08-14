import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DebtorsActions from './debtors.actions';
import { DebtorsEntity } from './debtors.models';
import { ClrLoadingState } from '@clr/angular';

export const DEBTORS_FEATURE_KEY = 'debtors';

export interface DebtorsState extends EntityState<DebtorsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedDebtor: DebtorsEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface DebtorsPartialState {
  readonly [DEBTORS_FEATURE_KEY]: DebtorsState;
}

export const debtorsAdapter: EntityAdapter<DebtorsEntity> =
  createEntityAdapter<DebtorsEntity>();

export const initialDebtorsState: DebtorsState = debtorsAdapter.getInitialState(
  {
    loaded: false,
    loading: false,
    error: undefined,
    selectedDebtor: undefined,
    total: 0,
    btnState: ClrLoadingState.DEFAULT,
    currentPage: 0,
  }
);

const reducer = createReducer(
  initialDebtorsState,
  on(
    DebtorsActions.getDebtorById,
    DebtorsActions.getPaginatedDebtors,
    DebtorsActions.getAllDebtors,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(DebtorsActions.getDebtorByIdSuccess, (state, { debtor }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedDebtor: debtor,
  })),

  on(DebtorsActions.getAllDebtorsSuccess, (state, { debtors }) =>
    debtorsAdapter.setAll(debtors, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    DebtorsActions.getPaginatedDebtorsSuccess,
    (state, { debtors, total, page }) =>
      debtorsAdapter.setAll(debtors, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    DebtorsActions.getAllDebtorsFailure,
    DebtorsActions.getDebtorByIdFailure,
    DebtorsActions.getPaginatedDebtorsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    DebtorsActions.createDebtor,
    DebtorsActions.updateDebtor,
    DebtorsActions.deleteDebtor,
    DebtorsActions.assignDebtorRoles,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    DebtorsActions.createDebtorSuccess,
    DebtorsActions.updateDebtorSuccess,
    DebtorsActions.deleteDebtorSuccess,
    DebtorsActions.assignDebtorRolesSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    DebtorsActions.createDebtorFailure,
    DebtorsActions.updateDebtorFailure,
    DebtorsActions.deleteDebtorFailure,
    DebtorsActions.assignDebtorRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function debtorsReducer(
  state: DebtorsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
