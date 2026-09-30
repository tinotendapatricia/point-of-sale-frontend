import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { type Page } from '@pos-frontend/shared/data-access';

import { AuditService } from './audit.service';
import { type AuditFilters, type AuditsEntity } from './audit.model';

interface State {
  audit: AuditsEntity | undefined;
  audits: AuditsEntity[];
  auditsPage: Page<AuditsEntity> | undefined;
}

const initialState: State = {
  audit: undefined,
  audits: [],
  auditsPage: undefined,
};

export const AuditStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('audits'),
  withReset(),
  withCallState({ collections: ['getPaginated'] }),

  withComputed(({ auditsPage }) => ({
    paginatedAudits: computed(() => auditsPage()?.content ?? []),
    totalAudits: computed(() => auditsPage()?.totalElements ?? 0),
  })),

  withMethods((store, service = inject(AuditService)) => ({
    getPaginatedAudits: rxMethod<AuditFilters | void>(
      pipe(
        tap(() => patchState(store, setLoading('getPaginated'))),
        switchMap(filters =>
          service.getPaginatedAudits(filters ?? {}).pipe(
            tapResponse({
              next: auditsPage => {
                patchState(store, { auditsPage }, setLoaded('getPaginated'));
              },
              error: error => {
                patchState(store, setError(error, 'getPaginated'));
              },
            })
          )
        )
      )
    ),
  }))
);
