import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuditsActions from './audits.actions';
import { AuditsEntity } from './audits.models';
import { ClrLoadingState } from '@clr/angular';

export const AUDITS_FEATURE_KEY = 'audits';

export interface AuditsState extends EntityState<AuditsEntity> {
  selectedId?: string | number;
  loaded?: boolean;
  loading: boolean;
  error?: Error;
  selectedAudit: AuditsEntity | undefined;
  total: number;
  btnState: ClrLoadingState;
  currentPage: number;
}

export interface AuditsPartialState {
  readonly [AUDITS_FEATURE_KEY]: AuditsState;
}

export const auditsAdapter: EntityAdapter<AuditsEntity> =
  createEntityAdapter<AuditsEntity>();

export const initialAuditsState: AuditsState = auditsAdapter.getInitialState({
  loaded: false,
  loading: false,
  error: undefined,
  selectedAudit: undefined,
  total: 0,
  btnState: ClrLoadingState.DEFAULT,
  currentPage: 0,
});

const reducer = createReducer(
  initialAuditsState,
  on(
    //AuditsActions.getAuditById,
    AuditsActions.getPaginatedAudits,
    //AuditsActions.getAllAudits,
    (state) => ({
      ...state,
      loading: true,
    })
  ),

  /*on(AuditsActions.getAuditByIdSuccess, (state, { audit }) => ({
    ...state,
    loading: false,
    loaded: true,
    selectedAudit: audit,
  })),

  on(AuditsActions.getAllAuditsSuccess, (state, { audits }) =>
    auditsAdapter.setAll(audits, {
      ...state,
      loading: false,
      loaded: true,
    })
  ),*/

  on(
    AuditsActions.getPaginatedAuditsSuccess,
    (state, { audits, total, page }) =>
      auditsAdapter.setAll(audits, {
        ...state,
        loading: false,
        loaded: true,
        total: total,
        currentPage: page,
      })
  ),

  on(
    //AuditsActions.getAllAuditsFailure,
    //AuditsActions.getAuditByIdFailure,
    AuditsActions.getPaginatedAuditsFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: error,
    })
  ),





);

export function auditsReducer(state: AuditsState | undefined, action: Action) {
  return reducer(state, action);
}
