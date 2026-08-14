import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PosActions from './pos.actions';
import { PosEntity } from './pos.models';
import { ClrLoadingState } from '@clr/angular';

export const POS_FEATURE_KEY = 'pos';

export interface PosState extends EntityState<PosEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedPos: PosEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface PosPartialState {
  readonly [POS_FEATURE_KEY]: PosState;
}

export const posAdapter: EntityAdapter<PosEntity> =
  createEntityAdapter<PosEntity>();

export const initialPosState: PosState = posAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  selectedPos: undefined,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  currentPage: 0,
});

const reducer = createReducer(
  initialPosState,
  /*on(
    PosActions.getPosById,
    PosActions.getPaginatedPos,
    PosActions.getAllPos,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  on(PosActions.getPosByIdSuccess, (state, { pos }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedPos: pos,
  })),

  on(PosActions.getAllPosSuccess, (state, { pos }) =>
    posAdapter.setAll(pos, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    PosActions.getPaginatedPosSuccess,
    (state, { pos, total, page }) =>
      posAdapter.setAll(pos, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    PosActions.getAllPosFailure,
    PosActions.getPosByIdFailure,
    PosActions.getPaginatedPosFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),*/

  on(
    PosActions.createPos,

    (state) => ({
      ...state,
      btnState: ClrLoadingState.LOADING,
      loaded: false,
      error: undefined,
    })
  ),

  on(PosActions.createPosuccess, (state, { posDetails }) => ({
    ...state,
    loaded: true,
    btnState: ClrLoadingState.SUCCESS,
    selectedPos: posDetails,
  })),

  on(PosActions.createPosFailure, (state, { error }) => ({
    ...state,
    error: error,
    btnState: ClrLoadingState.ERROR,
  }))
);

export function posReducer(state: PosState | undefined, action: Action) {
  return reducer(state, action);
}
