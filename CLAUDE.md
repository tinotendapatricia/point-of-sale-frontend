# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Nx 23 monorepo, Angular 22 (standalone only, no `NgModule`s anywhere), NgRx 22, Jest + Cypress. `README.md` has the longer architectural write-up; this file is the condensed working version.

## Commands

`package.json` has no scripts; everything goes through Nx.

```bash
npx nx serve admin-portal            # dev server on :4200 (also: customer-portal)
npx nx build admin-portal            # production build (default configuration)
npx nx lint <project>                # e.g. admin-feature-categories
npx nx test <project>                # Jest for one project
npx nx test <project> --testFile=categories-list.component.spec.ts   # single spec file
npx nx test <project> -t "creates"   # filter by test name
npx nx run-many -t test              # every project (also -t lint / -t build)
npx nx affected -t test,lint         # only projects touched by current changes
npx nx e2e admin-portal-e2e          # Cypress
npx nx show projects                 # list project names (names differ from paths)
```

Project names are the Nx names from each `project.json`, not the folder path — check with `npx nx show projects` before running a target.

## Apps

- `admin-portal` — back-office UI; root route lazy-loads `admin/feature-shell`, which renders nav/header and lazy-loads every `admin/feature-*` section, guarding all but `/auth` with `AuthGuard`.
- `customer-portal` — till UI; root route → `client/feature-shell` → `client/feature-{auth,pos,refund}`.
- `licensing-system` — unbuilt scaffold.

Both apps bootstrap with `bootstrapApplication()` in `apps/*/src/main.ts`. `importProvidersFrom` is used only for Clarity and ng-select (third-party NgModules).

## Library layering

```
libs/<domain>/data-access   state + HttpClient service, no UI
libs/<domain>/ui            presentational standalone components (inputs/outputs only)
libs/admin/feature-*        admin-portal routed pages (inject stores, compose ui libs)
libs/client/feature-*       customer-portal routed pages
libs/core                   app-wide: provideCoreServices(), DrawerService, ToastService, api types
libs/shared/{ui,data-access,utils}   cross-domain: BmgTable, Page<T> model, validators, sum helpers
```

- Import libs only through `@pos-frontend/<path>` aliases (`tsconfig.base.json` paths), never relative across project boundaries.
- `eslint.config.mjs` defines `type:*` / `scope:*` depConstraints, but every `project.json` currently has `"tags": []`, so those constraints aren't enforced yet. Add tags when creating new projects.
- Legacy, unrouted scaffolding (don't treat as current behaviour): `admin/feature-{permisions,price-list,prices,rates,reports,roles}`, `licensing/*`, `price-list/data-access`, `roles/ui`, `stock-movement/*`.

## State management: mid-migration

Two patterns coexist. New and migrated work uses the second.

1. **Classic NgRx (legacy)**: `data-access/src/lib/+state/` with actions/reducer/selectors/effects plus a `*Facade`. Registered via a `provide<Domain>DataAccess()` function (`provideState` + `provideEffects` + facade) placed in a route's `providers:` array. Route providers only cover that route and its children, so sibling routes that need the slice must each list it.
2. **NgRx Signal Store (target)**: `data-access/src/lib/<domain>.store.ts` using `signalStore({ providedIn: 'root' }, ...)` with `@angular-architects/ngrx-toolkit` (`withDevtools`, `withReset`, `withCallState({ collections: [...] })`). Already migrated: `categories`, `currencies`, `products`. See `libs/products/data-access/src/lib/product.store.ts` for the reference shape:
   - One call-state collection per operation (`getOne`, `getMany`, `getPaginated`, `create`, `update`, ...). Components read `store.<collection>Loading()` etc.
   - Reads use `rxMethod` + `switchMap`, writes use `exhaustMap`, results via `tapResponse` + `patchState(store, ..., setLoaded(...))`.
   - Write methods take `RxMethodInputWithCallback<T>` (`{ data, callback }` from `@pos-frontend/core`). The store shows the toast via `ToastService` and calls `callback()` on success, and the component uses that to close/navigate.
   - Paginated endpoints return `Page<T>` (`@pos-frontend/shared/data-access`), exposed through computed `paginated<X>` / `total<X>`.
   - Root-provided, so the feature routes need no `providers:` entry. Remove the old facade/provider function when you migrate a domain.

Migrated list pages (e.g. `libs/admin/feature-categories/.../categories-list.component.ts`) use `BmgTable` from `shared/ui` with Material `MatTableDataSource`/paginator, and open create forms as side panels with `DrawerService.open(Component, { title, size, injector })` and `.afterClosed()`, not as routed pages or Clarity modals.

## Auth

`auth/data-access` `AuthenticationService` stores the token in `sessionStorage` (lint warns on `localStorage`). `TokenInterceptorService` (registered by `provideCoreServices()`) attaches it and handles 401s.

## Lint rules that shape code

Angular rules live in the shared `angularProject({ prefix, dirname })` helper, which every project's `eslint.config.mjs` spreads after the root config. Notable errors:

- Standalone, OnPush, `inject()` over constructor DI, signal inputs/queries, `output()` over `EventEmitter`.
- Built-in `@if/@for/@switch` only. `NgIf`/`NgFor` imports and template-driven `FormsModule`/`NgModel` are banned.
- Reactive forms must be typed: inject `NonNullableFormBuilder` (not `FormBuilder`) and use `form.controls.x` instead of `form.get('x')`.
- Import operators from `'rxjs'`, not `'rxjs/operators'`.
- `consistent-type-imports` (inline `type` imports), no `any`, `eqeqeq`, `no-floating-promises`.
- Component styles must be a string (`styleUrl`/single style), max 5 inline template lines; no inline `style=` in templates; buttons need `type`.
- Selector prefix `pos-frontend` (elements kebab-case, attribute directives `posFrontend…`).
- Spec files relax non-null assertions, `any`, floating promises and OnPush.

Prettier: `singleQuote: true`.

## Testing notes

Jest via `jest-preset-angular` (root `jest.preset.js` → `@nx/jest/preset`). Clarity components need `ResizeObserver`/`IntersectionObserver` polyfills and `provideNoopAnimations()` in jsdom, and the `ui` libs that render Clarity grids/modals set this up in `test-setup.ts` or the spec. Specs for signal-store components usually provide a mocked store object with signal fields in place of the real root store.
