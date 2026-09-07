import { createAction, props } from '@ngrx/store';
import { AuditsEntity } from './audits.models';
import { DatagridState } from '@pos-frontend/shared/utils';

export const getPaginatedAudits = createAction(
  '[Audits] Get Paginated Audits',
  props<{ state: DatagridState }>()
);

export const getPaginatedAuditsSuccess = createAction(
  '[Audits] Get Paginated Audits Success',
  props<{ audits: AuditsEntity[]; total: number; page: number }>()
);

export const getPaginatedAuditsFailure = createAction(
  '[Audits] Get Paginated Audits Failure',
  props<{ error: Error }>()
);
