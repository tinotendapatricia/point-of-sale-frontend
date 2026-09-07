import { createAction, props } from '@ngrx/store';
import { DebtorsEntity } from './debtors.models';
import { DatagridState } from '@pos-frontend/shared/utils';

export const getPaginatedDebtors = createAction(
  '[Debtors] Get Paginated Debtors',
  props<{ state: DatagridState }>()
);

export const getPaginatedDebtorsSuccess = createAction(
  '[Debtors] Get Paginated Debtors Success',
  props<{ debtors: DebtorsEntity[]; total: number; page: number }>()
);

export const getPaginatedDebtorsFailure = createAction(
  '[Debtors] Get Paginated Debtors Failure',
  props<{ error: Error }>()
);

export const getAllDebtors = createAction('[Debtors] Get All Debtors');

export const getAllDebtorsSuccess = createAction(
  '[Debtors] Get All Debtors Success',
  props<{ debtors: DebtorsEntity[] }>()
);

export const getAllDebtorsFailure = createAction(
  '[Debtors] Get All Debtors Failure',
  props<{ error: Error }>()
);

export const getDebtorById = createAction(
  '[Debtors] Get Debtor',
  props<{ debtorId: string | number }>()
);

export const getDebtorByIdSuccess = createAction(
  '[Debtors] Get Debtor Success',
  props<{ debtor: DebtorsEntity }>()
);

export const getDebtorByIdFailure = createAction(
  '[Debtors] Get Debtor Failure',
  props<{ error: any }>()
);

export const createDebtor = createAction(
  '[Debtors] Create Debtor',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const createDebtorSuccess = createAction(
  '[Debtors] Create Debtor Success',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const createDebtorFailure = createAction(
  '[Debtors] Create Debtor Failure',
  props<{ error: Error }>()
);

export const deleteDebtor = createAction(
  '[Debtors] Delete Debtor',
  props<{ debtorId: string | number }>()
);

export const deleteDebtorSuccess = createAction(
  '[Debtors] Delete Debtor Success'
);

export const deleteDebtorFailure = createAction(
  '[Debtors] Delete Debtor Failure',
  props<{ error: Error }>()
);

export const updateDebtor = createAction(
  '[Debtors] Update Debtor',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const updateDebtorSuccess = createAction(
  '[Debtors] Update Debtor Success',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const updateDebtorFailure = createAction(
  '[Debtors] Update Debtor Failure',
  props<{ error: Error }>()
);

export const assignDebtorRoles = createAction(
  '[Debtors] Assign Debtor Roles',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const assignDebtorRolesSuccess = createAction(
  '[Debtors] Assign Debtor Roles Success',
  (debtorDetails: DebtorsEntity) => ({ debtorDetails })
);

export const assignDebtorRolesFailure = createAction(
  '[Debtors] Assign Debtor Roles Failure',
  props<{ error: Error }>()
);
