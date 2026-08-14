import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Utilities } from '@pos-frontend/shared/utils';
import {
  switchMap,
  catchError,
  of,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { GroupsSelectors } from '../..';
import { GroupsService } from '../services/groups.service';
import * as GroupsActions from './groups.actions';
import * as GroupsFeature from './groups.reducer';

@Injectable()
export class GroupsEffects {
  loadGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getGroupById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GroupsSelectors.getSelected(action.groupId)))
          )
        )
      ),
      switchMap(([action, cachedGroup]) => {
        if (cachedGroup)
          return of(
            GroupsActions.getGroupByIdSuccess({
              group: cachedGroup,
            })
          );

        return this.groupsService.getGroup(action.groupId).pipe(
          map((group) => GroupsActions.getGroupByIdSuccess({ group })),
          catchError((error) =>
            of(GroupsActions.getGroupByIdFailure({ error }))
          )
        );
      })
    )
  );

  loadAllGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getAllGroups),
      exhaustMap(() =>
        this.groupsService.getAllGroups().pipe(
          map((groups) => GroupsActions.getAllGroupsSuccess({ groups })),
          catchError((error) =>
            of(GroupsActions.getAllGroupsFailure({ error }))
          )
        )
      )
    )
  );

  loadGroupList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getPaginatedGroups),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(GroupsSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.groupsService
          .getPaginatedGroups(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((groupsObject) =>
              GroupsActions.getPaginatedGroupsSuccess({
                groups: groupsObject.content,
                total: groupsObject.totalElements,
                page: groupsObject.page,
              })
            ),
            catchError((error) =>
              of(GroupsActions.getPaginatedGroupsFailure({ error }))
            )
          )
      )
    )
  );

  createGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.createGroup),
      mergeMap((action) =>
        this.groupsService.createGroup(action.groupDetails).pipe(
          map((group) => GroupsActions.createGroupSuccess(group)),
          catchError((error) => of(GroupsActions.createGroupFailure({ error })))
        )
      )
    )
  );

  updateGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.updateGroup),
      mergeMap((action) =>
        this.groupsService.updateGroup(action.groupDetails).pipe(
          map((group) => GroupsActions.updateGroupSuccess(group)),
          catchError((error) => of(GroupsActions.updateGroupFailure({ error })))
        )
      )
    )
  );

  assignGroupRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.assignGroupRoles),
      mergeMap((action) =>
        this.groupsService.assignGroupRoles(action.groupDetails).pipe(
          map((group) => GroupsActions.assignGroupRolesSuccess(group)),
          catchError((error) =>
            of(GroupsActions.assignGroupRolesFailure({ error }))
          )
        )
      )
    )
  );

  deleteGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.deleteGroup),
      mergeMap((action) =>
        this.groupsService.deleteGroup(action.groupId).pipe(
          map(() => GroupsActions.deleteGroupSuccess()),
          catchError((error) => of(GroupsActions.deleteGroupFailure({ error })))
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          GroupsActions.createGroupSuccess,
          GroupsActions.updateGroupSuccess,
          GroupsActions.deleteGroupSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private store: Store<GroupsFeature.GroupsPartialState>
  ) {}
}
