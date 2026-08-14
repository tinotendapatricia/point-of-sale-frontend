import { createAction, props } from '@ngrx/store';
import { GroupsEntity } from './groups.models';
import { ClrDatagridStateInterface } from '@clr/angular';

export const getPaginatedGroups = createAction(
  '[User Manager/Groups] Get Paginated Groups',
  props<{ state: ClrDatagridStateInterface }>()
);

export const getPaginatedGroupsSuccess = createAction(
  '[User Manager/Groups] Get Paginated Groups Success',
  props<{ groups: GroupsEntity[]; total: number; page: number }>()
);

export const getPaginatedGroupsFailure = createAction(
  '[User Manager/Groups] Get Paginated Groups Failure',
  props<{ error: Error }>()
);

export const getAllGroups = createAction(
  '[User Manager/Groups] Get All Groups'
);

export const getAllGroupsSuccess = createAction(
  '[User Manager/Groups] Get All Groups Success',
  props<{ groups: GroupsEntity[] }>()
);

export const getAllGroupsFailure = createAction(
  '[User Manager/Groups] Get All Groups Failure',
  props<{ error: Error }>()
);

export const getGroupById = createAction(
  '[User Manager/Groups] Get Group',
  props<{ groupId: string | number }>()
);

export const getGroupByIdSuccess = createAction(
  '[User Manager/Groups] Get Group Success',
  props<{ group: GroupsEntity }>()
);

export const getGroupByIdFailure = createAction(
  '[User Manager/Groups] Get Group Failure',
  props<{ error: any }>()
);

export const createGroup = createAction(
  '[User Manager/Groups] Create Group',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const createGroupSuccess = createAction(
  '[User Manager/Groups] Create Group Success',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const createGroupFailure = createAction(
  '[User Manager/Groups] Create Group Failure',
  props<{ error: Error }>()
);

export const deleteGroup = createAction(
  '[User Manager/Groups] Delete Group',
  props<{ groupId: string | number }>()
);

export const deleteGroupSuccess = createAction(
  '[User Manager/Groups] Delete Group Success'
);

export const deleteGroupFailure = createAction(
  '[User Manager/Groups] Delete Group Failure',
  props<{ error: Error }>()
);

export const updateGroup = createAction(
  '[User Manager/Groups] Update Group',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const updateGroupSuccess = createAction(
  '[User Manager/Groups] Update Group Success',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const updateGroupFailure = createAction(
  '[User Manager/Groups] Update Group Failure',
  props<{ error: Error }>()
);

export const assignGroupRoles = createAction(
  '[User Manager/Groups] Assign Group Roles',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const assignGroupRolesSuccess = createAction(
  '[User Manager/Groups] Assign Group Roles Success',
  (groupDetails: GroupsEntity) => ({ groupDetails })
);

export const assignGroupRolesFailure = createAction(
  '[User Manager/Groups] Assign Group Roles Failure',
  props<{ error: Error }>()
);
