import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { UsersSelectors } from '../..';
import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
  //private actions$ = inject(Actions);

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getAllUsers),
      exhaustMap(() =>
        this.usersService.getAllUsers().pipe(
          map((users) => UsersActions.getAllUsersSuccess({ users })),
          catchError((error) => of(UsersActions.getAllUsersFailure({ error })))
        )
      )
    )
  );

  loadUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getPaginatedUsers),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(UsersSelectors.getCurrentPageState))
          )
        )
      ),
      exhaustMap(([action, page]) =>
        this.usersService
          .getPaginatedUsers(
            Utilities.formatDatagridState(
              action.state,
              action.state.page
                ? action.state.page.from! / action.state.page.size!
                : page
            )
          )
          .pipe(
            map((usersObject) =>
              UsersActions.getPaginatedUsersSuccess({
                users: usersObject.content,
                total: usersObject.totalElements,
                page: usersObject.page,
              })
            ),
            catchError((error) =>
              of(UsersActions.getPaginatedUsersFailure({ error }))
            )
          )
      )
    )
  );


  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      mergeMap((action) =>
        this.usersService.createUser(action.userDetails).pipe(
          map((user) => UsersActions.createUserSuccess(user)),
          catchError((error) => of(UsersActions.createUserFailure({ error })))
        )
      )
    )
  );

  /* updateUserGrou$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.updateUserUser),
    mergeMap((action) =>
      this.usersService.updateUserUser(action.updateContext).pipe(
        map((user) => UsersActions.updateUserUserSuccess(user)),
        catchError((error) =>
          of(UsersActions.updateUserUserFailure({ error }))
        )
      )
    )
  )
);*/

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUserById),
      mergeMap((action) =>
        this.usersService.getUserById(action.userId).pipe(
          map((user) => UsersActions.getUserByIdSuccess(user)),
          catchError((error) => of(UsersActions.getUserByIdFailure({ error })))
        )
      )
    )
  );

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUserProfile),
      mergeMap((action) =>
        this.usersService.getUserProfile().pipe(
          map((user) => UsersActions.getUserProfileSuccess(user)),
          catchError((error) =>
            of(UsersActions.getUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  changeUserStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.changeUserStatus),
      mergeMap((action) =>
        this.usersService.changeUserStatus(action.changeContext).pipe(
          map((user) => UsersActions.changeUserStatusSuccess(user)),
          catchError((error) =>
            of(UsersActions.changeUserStatusFailure({ error }))
          )
        )
      )
    )
  );

  /*updateContext$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateMyAccount),
      mergeMap((action) =>
        this.usersService.updateMyAccount(action.updateContext).pipe(
          map((user) => UsersActions.updateMyAccountSuccess(user)),
          catchError((error) =>
            of(UsersActions.updateMyAccountFailure({ error }))
          )
        )
      )
    )
  );*/

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap((action) =>
        this.usersService.updateUser(action.userDetails).pipe(
          map((user) => UsersActions.updateUserSuccess(user)),
          catchError((error) => of(UsersActions.updateUserFailure({ error })))
        )
      )
    )
  );

  assignUserRoles$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UsersActions.assignUserRoles),
    mergeMap((action) =>
      this.usersService.assignUserRoles(action.userDetails).pipe(
        map((user) => UsersActions.assignUserRolesSuccess(user)),
        catchError((error) =>
          of(UsersActions.assignUserRolesFailure({ error }))
        )
      )
    )
  )
);

  onSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ...[
            UsersActions.createUserSuccess,
            UsersActions.updateMyAccountSuccess,
            UsersActions.updateUserSuccess,
            UsersActions.changeUserStatusSuccess,
          ]
        ),
        tap(() => Utilities.displayToast('success'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router,
    private store: Store<UsersFeature.UsersPartialState>
  ) {}
}
