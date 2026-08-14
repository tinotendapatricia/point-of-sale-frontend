import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CreditorsActions from './creditors.actions';
import { CreditorsEntity } from './creditors.models';

export const CREDITORS_FEATURE_KEY = 'creditors';

export interface CreditorsState extends EntityState<CreditorsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedCreditor: CreditorsEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface CreditorsPartialState {
  readonly [CREDITORS_FEATURE_KEY]: CreditorsState;
}

export const creditorsAdapter: EntityAdapter<CreditorsEntity> =
  createEntityAdapter<CreditorsEntity>();

export const initialCreditorsState: CreditorsState =
  creditorsAdapter.getInitialState({
    loaded: false,
    loading: false,
    error: undefined,
    selectedCreditor: undefined,
    total: 0,
    btnState: ClrLoadingState.DEFAULT,
    currentPage: 0,
  });

const reducer = createReducer(
  initialCreditorsState,
  on(
    CreditorsActions.getCreditorById,
    CreditorsActions.getPaginatedCreditors,
    CreditorsActions.getAllCreditors,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(CreditorsActions.getCreditorByIdSuccess, (state, { creditor }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedCreditor: creditor,
  })),

  on(CreditorsActions.getAllCreditorsSuccess, (state, { creditors }) =>
    creditorsAdapter.setAll(creditors, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    CreditorsActions.getPaginatedCreditorsSuccess,
    (state, { creditors, total, page }) =>
      creditorsAdapter.setAll(creditors, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    CreditorsActions.getAllCreditorsFailure,
    CreditorsActions.getCreditorByIdFailure,
    CreditorsActions.getPaginatedCreditorsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    CreditorsActions.createCreditor,
    CreditorsActions.updateCreditor,
    CreditorsActions.deleteCreditor,
    CreditorsActions.assignCreditorRoles,
    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    CreditorsActions.createCreditorSuccess,
    CreditorsActions.updateCreditorSuccess,
    CreditorsActions.deleteCreditorSuccess,
    CreditorsActions.assignCreditorRolesSuccess,
    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    CreditorsActions.createCreditorFailure,
    CreditorsActions.updateCreditorFailure,
    CreditorsActions.deleteCreditorFailure,
    CreditorsActions.assignCreditorRolesFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function creditorsReducer(
  state: CreditorsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
