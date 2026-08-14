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
import { RolesSelectors } from '../..';
import { RolesService } from '../services/roles.service';
import * as RolesActions from './roles.actions';
import * as RolesFeature from './roles.reducer';

@Injectable()
export class RolesEffects {
  loadRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.getRoleById),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(RolesSelectors.getSelected(action.roleId)))
          )
        )
      ),
      switchMap(([action, cachedRole]) => {
        if (cachedRole)
          return of(
            RolesActions.getRoleByIdSuccess({
              role: cachedRole,
            })
          );

        return this.rolesService.getRole(action.roleId).pipe(
          map((role) => RolesActions.getRoleByIdSuccess({ role })),
          catchError((error) => of(RolesActions.getRoleByIdFailure({ error })))
        );
      })
    )
  );

  loadAllRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.getAllRoles),
      exhaustMap(() =>
        this.rolesService.getAllRoles().pipe(
          map((roles) => RolesActions.getAllRolesSuccess({ roles })),
          catchError((error) => of(RolesActions.getAllRolesFailure({ error })))
        )
      )
    )
  );

  loadRoleList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.getPaginatedRoles),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(RolesSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.rolesService
          .getPaginatedRoles(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((rolesObject) =>
              RolesActions.getPaginatedRolesSuccess({
                roles: rolesObject.content,
                total: rolesObject.totalElements,
                page: rolesObject.page,
              })
            ),
            catchError((error) =>
              of(RolesActions.getPaginatedRolesFailure({ error }))
            )
          )
      )
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.createRole),
      mergeMap((action) =>
        this.rolesService.createRole(action.roleDetails).pipe(
          map((role) => RolesActions.createRoleSuccess(role)),
          catchError((error) => of(RolesActions.createRoleFailure({ error })))
        )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.updateRole),
      mergeMap((action) =>
        this.rolesService.updateRole(action.roleDetails).pipe(
          map((role) => RolesActions.updateRoleSuccess(role)),
          catchError((error) => of(RolesActions.updateRoleFailure({ error })))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.deleteRole),
      mergeMap((action) =>
        this.rolesService.deleteRole(action.roleId).pipe(
          map(() => RolesActions.deleteRoleSuccess()),
          catchError((error) => of(RolesActions.deleteRoleFailure({ error })))
        )
      )
    )
  );

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          RolesActions.createRoleSuccess,
          RolesActions.updateRoleSuccess,
          RolesActions.deleteRoleSuccess
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private rolesService: RolesService,
    private store: Store<RolesFeature.RolesPartialState>
  ) {}
}
