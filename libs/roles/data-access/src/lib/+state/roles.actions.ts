import { createAction, props } from '@ngrx/store';
import { RolesEntity } from './roles.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedRoles = createAction(
  '[User Manager/Roles] Get Paginated Roles',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedRolesSuccess = createAction(
  '[User Manager/Roles] Get Paginated Roles Success',
  props<{ roles: RolesEntity[]; total: number; page: number }>()
);

export const getPaginatedRolesFailure = createAction(
  '[User Manager/Roles] Get Paginated Roles Failure',
  props<{ error: Error }>()
);

export const getAllRoles = createAction('[User Manager/Roles] Get All Roles');

export const getAllRolesSuccess = createAction(
  '[User Manager/Roles] Get All Roles Success',
  props<{ roles: RolesEntity[] }>()
);

export const getAllRolesFailure = createAction(
  '[User Manager/Roles] Get All Roles Failure',
  props<{ error: Error }>()
);

export const getRoleById = createAction(
  '[User Manager/Roles] Get Role',
  props<{ roleId: string | number }>()
);

export const getRoleByIdSuccess = createAction(
  '[User Manager/Roles] Get Role Success',
  props<{ role: RolesEntity }>()
);

export const getRoleByIdFailure = createAction(
  '[User Manager/Roles] Get Role Failure',
  props<{ error: any }>()
);

export const createRole = createAction(
  '[User Manager/Roles] Create Role',
  (roleDetails: RolesEntity) => ({ roleDetails })
);

export const createRoleSuccess = createAction(
  '[User Manager/Roles] Create Role Success',
  (roleDetails: RolesEntity) => ({ roleDetails })
);

export const createRoleFailure = createAction(
  '[User Manager/Roles] Create Role Failure',
  props<{ error: Error }>()
);

export const deleteRole = createAction(
  '[User Manager/Roles] Delete Role',
  props<{ roleId: string | number }>()
);

export const deleteRoleSuccess = createAction(
  '[User Manager/Roles] Delete Role Success'
);

export const deleteRoleFailure = createAction(
  '[User Manager/Roles] Delete Role Failure',
  props<{ error: Error }>()
);

export const updateRole = createAction(
  '[User Manager/Roles] Update Role',
  (roleDetails: RolesEntity) => ({ roleDetails })
);

export const updateRoleSuccess = createAction(
  '[User Manager/Roles] Update Role Success',
  (roleDetails: RolesEntity) => ({ roleDetails })
);

export const updateRoleFailure = createAction(
  '[User Manager/Roles] Update Role Failure',
  props<{ error: Error }>()
);
