import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withDevtools,
  withReset,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

import { type RxMethodInputWithCallback, ToastService } from '@pos-frontend/core';

import {
  type CompanyEntity,
  type CompanyRequest,
  type LicenseSystemRequest,
  type UpdateCompanyRequest,
} from './company.model';
import { CompanyService } from './company.service';

interface State {
  company: CompanyEntity | undefined;
  companies: CompanyEntity[];
}

const initialState: State = {
  company: undefined,
  companies: [],
};

export const CompanyStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withDevtools('companies'),
  withReset(),
  withCallState({
    collections: [
      'getMany',
      'getOne',
      'getLicense',
      'create',
      'update',
      'license',
      'delete',
    ],
  }),

  withMethods(
    (store, service = inject(CompanyService), toast = inject(ToastService)) => ({
      createCompany: rxMethod<RxMethodInputWithCallback<CompanyRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('create'))),
          exhaustMap(request =>
            service.createCompany(request.data).pipe(
              tapResponse({
                next: company => {
                  patchState(store, { company }, setLoaded('create'));
                  toast.success('Company created successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'create'));
                  toast.warning('Failed to create company');
                },
              })
            )
          )
        )
      ),

      licenseSystem: rxMethod<RxMethodInputWithCallback<LicenseSystemRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('license'))),
          exhaustMap(request =>
            service.licenseSystem(request.data).pipe(
              tapResponse({
                next: company => {
                  patchState(store, { company }, setLoaded('license'));
                  toast.success(
                    'License applied, thank you for licensing the system'
                  );
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'license'));
                  toast.warning('Failed to license the system');
                },
              })
            )
          )
        )
      ),

      /** Loads the single company (`/company/one`) into `company()`. */
      getCompany: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getOne'))),
          switchMap(() =>
            service.getCompany().pipe(
              tapResponse({
                next: company => {
                  patchState(store, { company }, setLoaded('getOne'));
                },
                error: error => {
                  patchState(store, setError(error, 'getOne'));
                },
              })
            )
          )
        )
      ),

      /** Loads the company license details into `company()`. */
      getLicense: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getLicense'))),
          switchMap(() =>
            service.getLicense().pipe(
              tapResponse({
                next: company => {
                  patchState(store, { company }, setLoaded('getLicense'));
                },
                error: error => {
                  patchState(store, setError(error, 'getLicense'));
                },
              })
            )
          )
        )
      ),

      updateCompany: rxMethod<RxMethodInputWithCallback<UpdateCompanyRequest>>(
        pipe(
          tap(() => patchState(store, setLoading('update'))),
          exhaustMap(request =>
            service.updateCompany(request.data).pipe(
              tapResponse({
                next: company => {
                  patchState(store, { company }, setLoaded('update'));
                  toast.success('Company updated successfully');
                  request.callback();
                },
                error: error => {
                  patchState(store, setError(error, 'update'));
                  toast.warning('Failed to update company');
                },
              })
            )
          )
        )
      ),

      deleteCompany: rxMethod<RxMethodInputWithCallback<string | number>>(
        pipe(
          tap(() => patchState(store, setLoading('delete'))),
          exhaustMap(({ data, callback }) =>
            service.deleteCompany(data).pipe(
              tapResponse({
                next: () => {
                  patchState(store, { company: undefined }, setLoaded('delete'));
                  toast.success('Company deleted successfully');
                  callback();
                },
                error: error => {
                  patchState(store, setError(error, 'delete'));
                  toast.warning('Failed to delete company');
                },
              })
            )
          )
        )
      ),

      getAllCompanies: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading('getMany'))),
          switchMap(() =>
            service.getAllCompanies().pipe(
              tapResponse({
                next: companies => {
                  patchState(store, { companies }, setLoaded('getMany'));
                },
                error: error => {
                  patchState(store, setError(error, 'getMany'));
                },
              })
            )
          )
        )
      ),
    })
  )
);
