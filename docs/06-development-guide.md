# 6. Development guide

## Prerequisites

- Node.js, matching what Angular 22 / Nx 23 need, and `npm`. The repo has both `package-lock.json` and `pnpm-lock.yaml`, so pick one and stay with it.
- The backend API running on `http://localhost:4000` with CORS allowed for `http://localhost:4200`.

```bash
npm install
```

## Everyday commands

`package.json` has no scripts. Everything runs through Nx.

```bash
npx nx serve admin-portal                 # http://localhost:4200
npx nx serve customer-portal              # till (use --port 4201 to run both)
npx nx build admin-portal                 # → dist/apps/admin-portal
npx nx test <project>                     # Jest for one project
npx nx test <project> --testFile=x.spec.ts
npx nx lint <project>
npx nx affected -t test,lint              # only what your change touches
npx nx run-many -t test                   # everything
npx nx e2e admin-portal-e2e               # Cypress
npx nx show projects                      # project names (≠ folder paths)
npx nx graph                              # dependency graph
```

Project names come from each `project.json`, for example `admin-feature-products` or `products-data-access`.

## Debugging tips

- **Redux DevTools:** every store uses `withDevtools('<name>')`, so you can inspect state and call status per store in the browser extension.
- **Wrong backend:** `BASE_URL` comes from `apps/<app>/src/environments/environment.ts`.
- **Kicked to login:** any 401 clears `sessionStorage`. Check the token and that the backend accepts the `Key` licence header.
- **Till won't log in:** check that `localStorage.station` matches a station under Admin → Configurations.
- **Two toasts on one error:** this is expected for writes (interceptor toast plus store warning). See [Architecture → HTTP layer](04-architecture.md#http-layer).

## Adding a new feature (recipe)

Example: a new "Branches" admin section.

The repo has two Claude Code skills for this: **`data-access`** (model, service, store, spec) and **`angular-ui`** (list page, form, drawer). Either way, the steps are:

1. **Generate the libs** with Nx, and add tags to `project.json` when you create them:
   ```bash
   npx nx g @nx/angular:library libs/branches/data-access --name=branches-data-access
   npx nx g @nx/angular:library libs/admin/feature-branches --name=admin-feature-branches
   # add --dry-run first to preview the generated files
   ```
2. **Data access** (`libs/branches/data-access/src/lib/`):
   - `branch.model.ts`: entity (extends `BaseEntity`), request types, filters.
   - `branch.service.ts`: inject `ApiService` and add one method per endpoint. Use `toHttpParams(filters)` for paging.
   - `branch.store.ts`: a root `signalStore` modelled on `product.store.ts`. It needs one call-state collection per operation, `switchMap` for reads, `exhaustMap` for writes, and `RxMethodInputWithCallback` with a toast for writes.
   - Export everything from `src/index.ts`.
3. **Feature pages** (`libs/admin/feature-branches/src/lib/`):
   - `admin-feature-branches.routes.ts` exporting `ADMIN_FEATURE_BRANCHES_ROUTES`.
   - A list component using `<pos-frontend-table>`. It reads `store.paginatedBranches()`, `store.totalBranches()` and `store.getPaginatedLoading()`.
   - A create/update form opened with `DrawerService.open(…)`. It submits with `store.createBranch({ data, callback: () => drawerRef.close(true) })`. The list reloads in `afterClosed()`.
4. **Wire it in:**
   - Add a `loadChildren` route under the guarded `''` route in `libs/admin/feature-shell/src/lib/admin-feature-shell.routes.ts`.
   - Add a menu item in `side-nav/side-nav.component.html`.
5. **Test and lint:** `npx nx affected -t test,lint`.

## Coding rules (lint enforced)

These rules come from `eslint.config.mjs` and the shared `angularProject()` helper. Breaking them fails lint.

- Standalone components, `ChangeDetectionStrategy.OnPush`, and `inject()` instead of constructor DI.
- `input()`, `output()`, `viewChild()` and the other signal APIs instead of decorators and `EventEmitter`.
- Built-in control flow only (`@if`, `@for`, `@switch`). `NgIf`, `NgFor`, `FormsModule` and `NgModel` are banned.
- Typed reactive forms: inject `NonNullableFormBuilder` and use `form.controls.x`, not `form.get('x')`.
- Import operators from `'rxjs'`, not from `'rxjs/operators'`.
- Use inline `type` imports. No `any`. Use `eqeqeq`. No floating promises.
- One style file per component (`styleUrl`), at most 5 inline template lines, no `style=` in templates, and every `<button>` has a `type`.
- Selector prefix `pos-frontend-…` (elements) / `posFrontend…` (attribute directives).
- Import across libs only through `@pos-frontend/*` aliases.
- Use `sessionStorage` for auth data. Lint warns on `localStorage`; the only intended use is the till station number.
- Prettier with `singleQuote: true`.

## Testing

- **Unit tests:** Jest via `jest-preset-angular`. Spec files may use `any`, non-null assertions and floating promises.
- **Components that use a store:** provide a **mock store object with signal fields**, not the real root store:
  ```ts
  const store = { paginatedProducts: signal([]), totalProducts: signal(0),
                  getPaginatedLoading: signal(false), getPaginatedProducts: jest.fn() };
  TestBed.configureTestingModule({ providers: [{ provide: ProductStore, useValue: store }] });
  ```
- **Services:** use `provideHttpClientTesting()` and `HttpTestingController`, and provide `BASE_URL`.
- **jsdom gaps:** Material overlays and drawers may need `provideNoopAnimations()`. The legacy Clarity-based specs polyfill `ResizeObserver` and `IntersectionObserver` in `test-setup.ts`.
- **E2E:** Cypress suites live in `apps/*-e2e`.

## Release build

```bash
npx nx build admin-portal
npx nx build customer-portal
```

Serve `dist/apps/<app>/` from any static web server. Hash routing means no rewrite rules are needed. Before a real deployment, give the build the right backend URL; see [Known issues](07-known-issues.md#configuration-and-deployment).
