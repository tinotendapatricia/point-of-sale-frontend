import { ClrLoadingState } from '@clr/angular';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as VatActions from './vat.actions';
import { VatEntity } from './vat.models';

export const VAT_FEATURE_KEY = 'vat';

export interface VatState extends EntityState<VatEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedVat: VatEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface VatPartialState {
  readonly [VAT_FEATURE_KEY]: VatState;
}

export const vatAdapter: EntityAdapter<VatEntity> =
  createEntityAdapter<VatEntity>();

export const initialVatState: VatState = vatAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  selectedVat: undefined,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  currentPage: 0,
});

const reducer = createReducer(
  initialVatState,
  on(
    VatActions.getVatById,

    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(VatActions.getVatByIdSuccess, (state, { vat }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedVat: vat,
  })),

  on(
    VatActions.getVatByIdFailure,

    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),

  on(
    VatActions.updateVat,

    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(
    VatActions.updateVatuccess,

    (state) => ({
      ...state,
      loaded: true,
      btnState: ClrLoadingState.SUCCESS,
    })
  ),

  on(
    VatActions.updateVatFailure,

    (state, { error }) => ({
      ...state,
      error: error,
      btnState: ClrLoadingState.ERROR,
    })
  )
);

export function vatReducer(state: VatState | undefined, action: Action) {
  return reducer(state, action);
}
