# Point of Sale Frontend

An Nx monorepo containing the frontend applications for a point-of-sale system: a back-office **admin portal**, a till-facing **customer portal**, and a standalone **licensing** app.

## Applications

| App | Purpose | Entry route |
|---|---|---|
| `admin-portal` | Back-office management UI — dashboard, products, stock, purchasing, sales/GP reports, users, groups, stations, VAT, currencies, company/license settings | `apps/admin-portal` |
| `customer-portal` | Till-facing POS UI used at the point of sale — login/station selection, ringing up sales, refunds | `apps/customer-portal` |
| `licensing-system` | Nx-scaffolded shell app, not yet built out (default generated component only) | `apps/licensing-system` |

Each app has a matching `*-e2e` project (Cypress) alongside it.

## Tech stack

- **Angular 22**, all standalone components — there are no `NgModule`s anywhere in this codebase, including at the app root (`bootstrapApplication`)
- **NgRx 22** (`store`, `effects`, `entity`, `store-devtools`) for state, one feature slice per business domain
- **Clarity Design System** (`@clr/angular` + `@cds/core`) for most UI chrome (datagrids, modals, forms), plus `@angular/material` and `@ng-select/ng-select` for a handful of specific controls
- **Nx 23** for the monorepo (build graph, caching, code generation, lint boundary rules)
- **Jest** (via `jest-preset-angular`) for unit tests, **Cypress** for e2e

## Repo layout

```
apps/
  admin-portal/        # back-office app: main.ts, app shell, environments
  customer-portal/      # till app: main.ts, app shell, environments
  licensing-system/     # placeholder app
  *-e2e/                # Cypress suites for each app
libs/
  <domain>/
    data-access/        # NgRx state + HTTP services for that domain
    ui/                 # dumb/presentational standalone components for that domain
  admin/feature-*/       # admin-portal routed pages, one lib per section
  client/feature-*/      # customer-portal routed pages
  core/                  # app-wide providers: HTTP interceptors, licensing check
  shared/{ui,utils,data-access}/  # cross-domain building blocks
```

Domains today: `audit-trail`, `auth`, `categories`, `company-details`, `configurations`, `creditors`, `currencies`, `debtors`, `goods-received`, `groups`, `pos`, `products`, `purchase-orders`, `reports`, `roles`, `stations`, `stock-take`, `users`, `vat`.

A few `libs/admin/feature-*` and standalone domain libs (`feature-permisions`, `feature-price-list`, `feature-prices`, `feature-rates`, `feature-reports`, `feature-roles`, `licensing/*`, `price-list/data-access`, `roles/ui`, `stock-movement/*`) are legacy scaffolding left over from earlier iterations — they aren't wired into either app's routes and can be treated as dead weight rather than documentation of current behavior.

## How a domain is structured

Every business domain follows the same two-library split:

**`<domain>/data-access`** — no UI, just state and HTTP:
- `+state/` — the NgRx slice: `actions`, `reducer`, `selectors`, `effects` (talks to the backend), and a `facade` that wraps the store behind a small class API components inject instead of dealing with `Store`/`select`/`dispatch` directly
- `services/` — the `HttpClient` wrapper the effects call
- `<domain>-data-access.providers.ts` — a `provide<Domain>DataAccess()` function returning `provideState(...)` + `provideEffects(...)` + the facade, used wherever that domain's state needs to exist in the injector tree (see [Providing state](#providing-state-instead-of-ngmodule) below)

**`<domain>/ui`** — standalone, presentation-only components (forms, list grids) that take `@Input()`s and emit `@Output()`s; they know nothing about NgRx or HTTP and are consumed by the feature libs below.

**`admin/feature-<domain>` / `client/feature-<domain>`** — the actual routed pages for each app. These import the domain's `ui` components, inject its data-access `facade`, and are wired into the app through `admin/feature-shell` or `client/feature-shell`.

## App bootstrap

Both apps are pure `bootstrapApplication()` calls (`apps/*/src/main.ts`) — there's no root `AppModule`. The provider list is roughly:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ClarityModule, NgSelectModule), // 3rd-party libs not standalone yet
    provideAnimations(),
    provideCoreServices(),        // HTTP interceptors + auth data-access, see libs/core
    provideStore({}, { ...runtimeChecks }),
    provideStoreDevtools({ ... }),
    provideEffects(),
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideRouter([{ path: '', loadChildren: () => import('@pos-frontend/admin/feature-shell')... }]),
  ],
});
```

`importProvidersFrom` is used *only* for the two third-party Angular libraries that still ship classic `NgModule`s (Clarity, ng-select) — it's a bridge for code we don't own, not a pattern used anywhere in this repo's own code.

## Providing state instead of NgModule

Domain state used to be registered by importing an `NgModule` (e.g. `AuditsDataAccessModule`) into a feature module. Now it's registered by calling that domain's provider function from wherever the state needs to be available — most commonly in a route's `providers:` array, so the slice is only loaded when that part of the app is actually navigated to:

```ts
// libs/admin/feature-audits/src/lib/admin-feature-audits.routes.ts
export const ADMIN_FEATURE_AUDITS_ROUTES: Routes = [
  {
    path: '',
    providers: [provideAuditTrailDataAccess()],
    children: [ /* ... */ ],
  },
];
```

Angular's router `providers:` scope to that route and its children, not to sibling routes — so if two routes at the same level both need a slice, both need to list its provider function.

## Routing

Each app has exactly one top-level route pointing at a `*-feature-shell` lib, which lazy-loads every section via `loadChildren`:

```
admin-portal  -> admin/feature-shell   -> admin/feature-{dashboard,products,users,...}
customer-portal -> client/feature-shell -> client/feature-{auth,pos,refund}
```

`admin/feature-shell` also renders the persistent chrome (side nav, header) around whichever child route is active, and gates everything except `/auth` behind `AuthGuard` (from `auth/data-access`).

## Auth

`auth/data-access` owns the login flow: `AuthenticationService` calls the backend and stores the token in `sessionStorage`; `TokenInterceptorService` (registered by `provideCoreServices()` in `libs/core`) attaches it to every outgoing request and handles 401s; `AuthGuard` blocks navigation into protected routes until a session exists.

## Import rules

Libraries are only ever imported by their Nx-generated alias — `@pos-frontend/<lib-path>` — resolved via `tsconfig.base.json`'s `paths`, never by relative path across a project boundary. This is enforced by `@nx/enforce-module-boundaries` (see `eslint.config.mjs`); a deep relative import across libs will fail lint even if it compiles.

## Working with the workspace

```bash
npx nx serve admin-portal        # dev server, http://localhost:4200
npx nx serve customer-portal
npx nx build admin-portal         # production build
npx nx test <project>             # unit tests for one project (Jest)
npx nx run-many -t test           # unit tests for every project
npx nx run-many -t lint           # lint every project
npx nx run-many -t build --all    # build every buildable project
npx nx e2e admin-portal-e2e       # Cypress e2e
npx nx graph                      # visualize the project dependency graph
```

Clarity's web components need a couple of browser APIs jsdom doesn't implement; the domain `ui` libs that render Clarity datagrids/modals polyfill `ResizeObserver`/`IntersectionObserver` and provide `provideNoopAnimations()` in their `test-setup.ts` / spec files for exactly that reason.
