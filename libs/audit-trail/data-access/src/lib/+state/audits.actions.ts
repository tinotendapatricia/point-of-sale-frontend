import { createAction, props } from '@ngrx/store';
import { AuditsEntity } from './audits.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedAudits = createAction(
  '[Audits] Get Paginated Audits',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedAuditsSuccess = createAction(
  '[Audits] Get Paginated Audits Success',
  props<{ audits: AuditsEntity[]; total: number; page: number }>()
);

export const getPaginatedAuditsFailure = createAction(
  '[Audits] Get Paginated Audits Failure',
  props<{ error: Error }>()
);
