import { createAction, props } from '@ngrx/store';
import { CreditorsEntity } from './creditors.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedCreditors = createAction(
  '[Creditors] Get Paginated Creditors',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedCreditorsSuccess = createAction(
  '[Creditors] Get Paginated Creditors Success',
  props<{ creditors: CreditorsEntity[]; total: number; page: number }>()
);

export const getPaginatedCreditorsFailure = createAction(
  '[Creditors] Get Paginated Creditors Failure',
  props<{ error: Error }>()
);

export const getAllCreditors = createAction(
  '[Creditors] Get All Creditors'
);

export const getAllCreditorsSuccess = createAction(
  '[Creditors] Get All Creditors Success',
  props<{ creditors: CreditorsEntity[] }>()
);

export const getAllCreditorsFailure = createAction(
  '[Creditors] Get All Creditors Failure',
  props<{ error: Error }>()
);

export const getCreditorById = createAction(
  '[Creditors] Get Creditor',
  props<{ creditorId: string | number }>()
);

export const getCreditorByIdSuccess = createAction(
  '[Creditors] Get Creditor Success',
  props<{ creditor: CreditorsEntity }>()
);

export const getCreditorByIdFailure = createAction(
  '[Creditors] Get Creditor Failure',
  props<{ error: any }>()
);

export const createCreditor = createAction(
  '[Creditors] Create Creditor',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const createCreditorSuccess = createAction(
  '[Creditors] Create Creditor Success',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const createCreditorFailure = createAction(
  '[Creditors] Create Creditor Failure',
  props<{ error: Error }>()
);

export const deleteCreditor = createAction(
  '[Creditors] Delete Creditor',
  props<{ creditorId: string | number }>()
);

export const deleteCreditorSuccess = createAction(
  '[Creditors] Delete Creditor Success'
);

export const deleteCreditorFailure = createAction(
  '[Creditors] Delete Creditor Failure',
  props<{ error: Error }>()
);

export const updateCreditor = createAction(
  '[Creditors] Update Creditor',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const updateCreditorSuccess = createAction(
  '[Creditors] Update Creditor Success',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const updateCreditorFailure = createAction(
  '[Creditors] Update Creditor Failure',
  props<{ error: Error }>()
);

export const assignCreditorRoles = createAction(
  '[Creditors] Assign Creditor Roles',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const assignCreditorRolesSuccess = createAction(
  '[Creditors] Assign Creditor Roles Success',
  (creditorDetails: CreditorsEntity) => ({ creditorDetails })
);

export const assignCreditorRolesFailure = createAction(
  '[Creditors] Assign Creditor Roles Failure',
  props<{ error: Error }>()
);
