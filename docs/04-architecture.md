# 4. Architecture

## Tech stack

| Concern | Choice |
|---|---|
| Monorepo | Nx 23 |
| Framework | Angular 22, **standalone only** (no `NgModule`s), OnPush, signals |
| State | **NgRx Signal Store** (`@ngrx/signals`) + `@angular-architects/ngrx-toolkit` (`withDevtools`, `withReset`, `withCallState`) |
| UI | Angular Material 3 (custom theme), Tailwind (utilities, preflight off), `@ng-select/ng-select` for searchable selects |
| Toasts | izitoast, wrapped by `ToastService` |
| Tests | Jest (`jest-preset-angular`), Cypress e2e |

> Classic NgRx (`@ngrx/store`, `effects`, `entity`, `router-store`, `component-store`) and Clarity (`@clr/*`, `@cds/core`) are still in `package.json`, but the app code no longer uses them. The migration to Signal Stores is finished. Clarity markup survives only in the legacy `price-list/ui` lib. See [Known issues](07-known-issues.md#documentation-drift).

## Repository layout

```
apps/
  admin-portal/          main.ts, app.component (router-outlet), environments, styles.scss, tailwind.config.js
  customer-portal/       same shape, for the till
  licensing-system/      empty scaffold
  *-e2e/                 Cypress suites
libs/
  core/                  provideCoreServices(), tokenInterceptor, ToastService, DrawerService, badge directive, api types
  shared/
    data-access/         ApiService + BASE_URL token, toHttpParams, Page<T>
    ui/                  BmgTable (pos-frontend-table), dialogs, reports layout, Material theme
    utils/               file download/display, validators, sum helpers
  <domain>/data-access/  <domain>.model.ts, <domain>.service.ts, <domain>.store.ts
  <domain>/ui/           presentational components (inputs/outputs only)
  admin/feature-*/       routed admin pages (one lib per section)
  client/feature-*/      routed till pages (shell, auth, pos, refund)
```

Libraries are imported **only** through `@pos-frontend/<path>` aliases in `tsconfig.base.json`, never through relative paths across libs.

### Layering

```
        apps/*  (bootstrap only)
          │
          ▼
  admin|client/feature-shell      routes, header, side-nav, authGuard
          │ loadChildren
          ▼
  admin|client/feature-<x>        smart pages: inject stores, open drawers/dialogs
          │                │
          ▼                ▼
   <domain>/ui      <domain>/data-access      (store → service)
          │                │
          └──────┬─────────┘
                 ▼
     shared/{ui,data-access,utils}, core
```

| Layer | Allowed to depend on | Must not |
|---|---|---|
| `feature-*` | data-access, ui, shared, core | be imported by other libs |
| `<domain>/ui` | shared/ui, shared/utils, models | inject stores or HttpClient |
| `<domain>/data-access` | shared/data-access, core | contain components |
| `core`, `shared/*` | each other (no cycles) | import domain libs |

`eslint.config.mjs` defines `type:*` / `scope:*` dependency constraints, but every `project.json` has `"tags": []`, so lint does not enforce them yet.

### Domains

| Domain | Store (all `providedIn: 'root'`) | Used by |
|---|---|---|
| auth | `AuthStore` | both apps (login/logout) |
| audit-trail | `AuditStore` | admin audits |
| categories | `CategoryStore` | admin categories |
| company-details | `CompanyStore` | both logins (licence), admin company |
| configurations | `ConfigurationStore` | admin configurations, till login, cash-up |
| creditors | `CreditorStore` | admin creditors, purchase orders |
| currencies | `CurrencyStore` | admin currencies/debtors/cash-up, both headers, till |
| debtors | `DebtorStore` | admin debtors/reports, till |
| groups | `GroupStore` | not routed (route commented out) |
| pos | `PosStore` (+ `station-storage.ts`) | till sale/refund |
| products | `ProductStore` | admin products/PO/stock take/reports, till |
| purchase-orders | `PurchaseOrderStore` | admin purchase orders, receive products |
| reports | `ReportStore` | admin sales/stock/purchases reports |
| roles | `RoleStore` | admin roles, user permissions |
| stock-take | `StockTakeStore` | admin stock take |
| users | `UserStore` | admin users, till header (profile) |
| vat | `VatStore` | not routed (route commented out) |
| dashboard | `DashboardStore` (inside `admin/feature-dashboard`) | admin dashboard |

Legacy or unrouted libs that do **not** describe current behaviour: `admin/feature-{permisions,price-list,prices,rates,reports}`, `licensing/*`, `price-list/*`, `roles/ui`, `stock-movement/*`, `goods-received/data-access` (empty), `feature-audit-trail`.

## Bootstrap

`apps/<app>/src/main.ts` calls `bootstrapApplication(AppComponent, …)` with:

```ts
importProvidersFrom(NgSelectModule),          // only third-party NgModule left
provideAnimations(),
provideCoreServices(),                        // HttpClient + tokenInterceptor
{ provide: BASE_URL, useValue: environment.baseUrl },
Title,
{ provide: LocationStrategy, useClass: HashLocationStrategy },
{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
provideRouter([{ path: '', loadChildren: () => import('@pos-frontend/<admin|client>/feature-shell') … }],
              withEnabledBlockingInitialNavigation()),
```

`environment.ts` contains `{ production: false, baseUrl: 'http://localhost:4000' }` in both apps. The builds have no production environment file or `fileReplacements`. See [Known issues](07-known-issues.md).

## Routing

```
admin-portal
  ''  → ADMIN_FEATURE_SHELL_ROUTES
        auth/login                     (no guard)
        ''  PortalContainer [authGuard] → header + side-nav + <router-outlet>
            dashboard · products(/break-bulk) · currencies · creditors · purchase-orders
            receive-products · purchases-reports/* · debtors · sales-reports/*
            stock-take/{batch,compare} · stocks/* · users(/view/:id, /view-user-authorities/:id)
            roles · configurations · company · audits · categories(/new, /update/:id)
            (groups, vat: commented out)

customer-portal
  ''  → CLIENT_FEATURE_SHELL_ROUTES
        auth/login                     (no guard)
        ''  PortalContainer [authGuard] → header + <router-outlet>
            '' → pos · pos · refund
```

- Every section is lazy-loaded with `loadChildren`.
- Report sections (`sales-reports`, `stocks`, `purchases-reports`, `stock-take`) use the shared `ReportsLayoutComponent`. A `*-pages.ts` file in each lib drives the left nav and the child routes.
- Stores are root-provided, so routes need no `providers:` entries.

## State management: Signal Store pattern

Every domain store follows the same shape. The reference is `libs/products/data-access/src/lib/product.store.ts`:

```ts
export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),                  // { product, products (all), productsPage: Page<T> }
  withDevtools('products'),
  withReset(),
  withCallState({ collections: ['getPaginated', 'create', 'break', 'getOne', 'update', 'delete', 'getMany'] }),
  withComputed(({ productsPage }) => ({
    paginatedProducts: computed(() => productsPage()?.content ?? []),
    totalProducts:     computed(() => productsPage()?.totalElements ?? 0),
  })),
  withMethods((store, service = inject(ProductService), toast = inject(ToastService)) => ({
    getPaginatedProducts: rxMethod<ProductFilters | void>(pipe(
      tap(() => patchState(store, setLoading('getPaginated'))),
      switchMap((filters) => service.getPaginatedProducts(filters ?? undefined).pipe(tapResponse({
        next:  (productsPage) => patchState(store, { productsPage }, setLoaded('getPaginated')),
        error: (error) => patchState(store, setError(error, 'getPaginated')),
      }))),
    )),
    createProduct: rxMethod<RxMethodInputWithCallback<CreateProductRequest>>(pipe(
      tap(() => patchState(store, setLoading('create'))),
      exhaustMap((request) => service.createProduct(request.data).pipe(tapResponse({
        next: (product) => {
          patchState(store, { product }, setLoaded('create'));
          toast.success('Product created successfully');
          request.callback();
        },
        error: (error) => {
          patchState(store, setError(error, 'create'));
          toast.warning('Failed to create product');
        },
      }))),
    )),
  })),
);
```

Rules:
- **One call-state collection per operation.** Components read `store.createLoading()`, `store.getPaginatedLoading()` and so on.
- **Reads** use `switchMap`, so a newer request cancels the older one. **Writes** use `exhaustMap`, so double-clicks are ignored.
- **Writes take `{ data, callback }`** (`RxMethodInputWithCallback<T>` from `@pos-frontend/core`). The store shows the success toast. The component passes `callback` to close the drawer or dialog, navigate, or reload the list.
- **Paginated endpoints** return `Page<T>` (`{ content, totalElements, totalPages, page }`), exposed as computed `paginated<X>` and `total<X>`.
- Filters are turned into query params with `toHttpParams(filters)`, which drops `null` and `undefined`.

### Data flow of a typical create

```
CreateXComponent (in drawer)          XStore                     XService        ApiService        Backend
  submit ─ store.createX({data, ──▶ setLoading('create')
           callback: () =>           exhaustMap ───────────────▶ post('/x/create') ─▶ BASE_URL+path ─▶ POST
           drawerRef.close(true)})                                                  (tokenInterceptor adds headers)
                                     ◀────────────────────────────────────────────── 200
                                     setLoaded, toast.success, callback()
ListXComponent  ◀── drawerRef.afterClosed() → true → store.getPaginatedX(filters)
```

## HTTP layer

**`ApiService`** (`libs/shared/data-access/src/lib/services/api.service.ts`, root) puts `BASE_URL` in front of every path:
`get`, `post`, `put`, `patch`, `delete`, `file` (multipart), `getFile`/`postFile` (return `Blob`, used by all reports) and `upload`.

Domain services (`<domain>.service.ts`) are thin wrappers with one method per endpoint. See the [API reference](05-api-reference.md).

**`tokenInterceptor`** (`libs/core/src/lib/services/token-interceptor.service.ts`, functional, registered by `provideCoreServices()`):

1. Adds `Authorization: Bearer <sessionStorage.accessToken>` and `Key: Bearer <sessionStorage.license>`.
2. Retries any failed request once (`retry(1)`).
3. Shows a toast for every error, using the backend's `error.error.message` when it has one:

| Status | Behaviour |
|---|---|
| 401 | error toast, `sessionStorage.clear()`, navigate to `auth/login` |
| 403, 405 | info toast |
| 404, other | error toast |

4. Rethrows the error, so the store's `tapResponse.error` still runs.

Because the interceptor already shows the backend's error message, stores only call `setError` on failed **reads**. On failed **writes**, stores also show a short `toast.warning('Failed to …')`, so the user sees two toasts.

## Authentication

| Item | Where |
|---|---|
| Login API | `AuthStore.adminLogin` → `POST /auth/login` → `{ token, userId }`. **Both apps use this.** `clientLogin` (`/authenticate`) and `register` exist but nothing calls them. |
| Session storage | `sessionStorage`: `accessToken`, `userId`, `license`. Lint warns on `localStorage`. |
| Station | `localStorage`: `station` (`libs/pos/data-access/src/lib/station-storage.ts`). It is kept there on purpose so it survives `sessionStorage.clear()`. |
| Guard | Functional `authGuard` (`libs/auth/data-access/src/lib/auth.guard.ts`). It passes when the token exists and otherwise redirects to `auth/login?returnUrl=…`. It doesn't check token expiry or roles. |
| Logout | `AuthStore.logout()` → `sessionStorage.clear()` + navigate to login. It makes no backend call. |
| Licence | Each login page loads `GET /company/one` and saves `company.license` to sessionStorage. The admin login can renew it with `PUT /company/license`. |
| Authorisation | Only the backend enforces it, by role. The frontend has no role-based hiding. |

## UI building blocks

### `BmgTable`: `<pos-frontend-table>` (`libs/shared/ui/src/lib/table/`)
A Material table with card chrome, skeleton loading, an empty state and a paginator.

```html
<pos-frontend-table
  caption="Products" [data]="dataSource" [columns]="columns" [loading]="store.getPaginatedLoading()"
  [paginated]="true" [total]="store.totalProducts()" (page)="onPage($event)"
  [action]="true" (actioned)="openCreate()">
  <header>…buttons…</header>
</pos-frontend-table>
<ng-template #statusTpl let-row>…</ng-template>
```

- `columns: TableColumnDef[]` = `{ key, header, align?, template? }`. A custom cell template gets `{ $implicit: row, col }`.
- Server paging: `[paginated]="true"` + `[total]` + `(page)`. Client paging: `[tplPagination]="true"`.

### `DrawerService` (`libs/core/src/lib/services/drawer/`)
A side panel built on CDK Overlay. Use it for create and edit forms.

```ts
// list page (caller)
const ref = this.drawer.open<CreateRoleComponent, boolean, RolesEntity | undefined>(CreateRoleComponent, {
  title: role ? 'Update Role' : 'New Role', size: 'md', data: role, injector: this.injector,
});
ref.afterClosed().subscribe((saved) => saved && this.reload());

// drawer component (see libs/admin/feature-roles/src/lib/create-role/)
private readonly drawerRef = injectDrawerRef<boolean, RolesEntity | undefined>();
protected readonly role = this.drawerRef.data;   // or injectDrawerData<D>()
this.drawerRef.close(true);
```

- Sizes: `sm` 360px, `md` 560px (the default), `xl` 860px, `full`. Drawers can be stacked.
- Escape and a backdrop click close the drawer unless `disableClose` is set. Navigating closes it by default.
- Pass `injector` when the drawer component needs providers from its caller.

Many older pages still use `MatDialog` (about 27 files). New work should use `DrawerService`.

### Other shared pieces
- **`ToastService`:** `success/error/warning/info(message?)`, shown centred for 2 seconds.
- **`ReportsLayoutComponent`, `ReportNavComponent`:** two-column report pages with a left nav.
- **`ActionConfirmationFormComponent`, `InlineConfirmComponent`:** confirmation dialog or inline confirmation.
- **`DialogHeaderComponent`:** title, subtitle and close button.
- **`[posFrontendBadge]`** (core): status chip, variants `success | error | pending | info | void | count`.
- **`Utilities`** (shared/utils): `displayFile(blob)` opens a report PDF in a new tab, and `downloadFile(blob, name)` picks the extension from the MIME type.
- **Report forms** (`reports/ui`): `ReportsFormComponent` shows date, product, debtor and number fields based on input flags, and emits view, PDF or Excel. `CashupFormComponent` handles cash-up denominations.

## Styling

- **Theme:** `libs/shared/ui/src/styles/_pos-theme.scss`. Material 3 with brand teal `#0F786C`, 6px radius, outlined fields and no ripple. It also defines CSS variables (`--color-bg`, `--color-surface`, `--color-text`, `--radius-md`, …) and helper classes (`.es-panel`, `.es-eyebrow`, `.required`).
- Each app's `styles.scss` `@use`s the theme and `core/.../drawer/_drawer.scss`.
- **Tailwind** handles layout utilities. Preflight is off, so Material's base styles are not reset. Brand aliases: `surface`, `hairline`, `ink`, `ink-muted`, `title`.
- Component styles must be a single `styleUrl`, and templates must not use inline `style=` (lint rule).

## Build and deployment

- Builder: `@angular/build:application` → `dist/apps/<app>/`. Production budgets: 1.5 MB warning, 3 MB error.
- Hash routing means the build is plain static files and needs no SPA rewrite rules.
- The repo has no Dockerfile, nginx config, dev-server proxy or CI pipeline. In development the browser calls `http://localhost:4000` directly, so the backend must allow CORS from `localhost:4200`.
- `BASE_URL` comes from `environment.ts` at build time. To point a build at another backend, add a production environment file plus `fileReplacements`, or load the URL at runtime.
