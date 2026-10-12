# 7. Known issues and gaps

These came up while writing these docs (October 2026). Each item points at the code so it can be fixed or turned into a ticket. Delete an item once it is fixed.

## Bugs

| # | Area | Issue | Where |
|---|---|---|---|
| 1 | Till | **Possible duplicate invoices.** The interceptor retries every failed request once (`retry(1)`), including `POST /invoices/create`. If the first request reached the server but the response failed, the sale can be posted twice. Retry only idempotent methods (GET). | `libs/core/src/lib/services/token-interceptor.service.ts` |
| 2 | Admin login | The licence "expired" warning never shows, because `daysRemaining` uses `Math.abs(...)` and so is never negative. | `libs/admin/feature-auth/src/lib/login-feature/login-feature.component.ts:36` |
| 3 | Admin header | The "My Account" link goes to `/users/my-account`, which has no route. | `libs/admin/feature-shell/src/lib/header/header.component.html:20` |
| 4 | Currencies | The "Rate to Default" column always shows `0` (the template is hard-coded to `{{ 0 \| currency }}`). | `libs/admin/feature-currencies/src/lib/currencies-list/currencies-list.component.html` |
| 5 | Purchase orders | The Date field is collected but not sent to the backend. | `libs/admin/feature-purchase-orders/src/lib/create-purchase-order/` |
| 6 | Login | `returnUrl` is set by `authGuard` but ignored after login, so users always land on the home page. | both login components |
| 7 | Till / admin | "Current" price, cost and rate is always `[0]` of the history array, not the entry with the latest `effectiveDate`. This is correct only if the backend returns newest first. | `libs/pos/ui/src/lib/pos-form/`, products list, PO form |
| 8 | Till | The tender step allows underpayment (negative change is only shown in red). | `libs/pos/ui/src/lib/tender-form/` |
| 9 | Till header | The station number is read once when the header is built. The currency shows only after a POS page has loaded it. | `libs/client/feature-shell/src/lib/header/` |
| 10 | Login form | The username input is `type="email"`, so browsers may reject usernames that aren't email addresses. | `libs/auth/ui/src/lib/login-form/` |

## Unfinished or hidden features

- **Receipts:** the `print-receipt` component is an empty scaffold. Station `printerName` and `copies` are stored but the frontend never uses them.
- **Refund lookup:** refunds are rebuilt by hand. There is no link to the original invoice except the free-text Reference. Out-of-stock products can't be added to a refund.
- **Debtor discount** is captured in admin but not applied at the till.
- **Payment methods and split tender** are not supported.
- **Purchase order list:** there is no screen to browse or delete POs (`GET /purchase-orders/paginated` exists but nothing uses it).
- **No delete** on any admin list except Roles. **No search or filter** on list pages, even though the filter models support `search`, `sort` and `order`.
- **Categories** is routed (`#/categories`) but has no side-nav entry.
- **Groups** and **VAT** routes are commented out in the admin shell. Their data-access libs work.
- **Dashboard:** the Top-selling and Low-stock widgets are built but not placed on the page.
- **Client-side authorisation:** every signed-in user sees every screen. Only the backend enforces roles.
- **Licensing System app** is an empty scaffold.

## Configuration and deployment

- **No production environment.** Both apps hard-code `baseUrl: 'http://localhost:4000'`, and there are no `environment.prod.ts` files and no `fileReplacements`. A production build still points at localhost.
- **No CI/CD, Dockerfile, nginx config or dev proxy** in the repo.
- **Nx boundary tags** are not set (`"tags": []` everywhere), so the `type:*` / `scope:*` lint constraints don't run.
- **Unused dependencies:** `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, `@ngrx/router-store`, `@ngrx/component-store`, `@clr/angular`, `@clr/ui` and `@cds/core` are installed but the app code doesn't use them.
- **Two lock files** (`package-lock.json` and `pnpm-lock.yaml`).
- **Unregistered code:** `licenseInterceptor` duplicates the `Key` header logic in `tokenInterceptor` and is never registered.
- **API path oddities** that come from the backend, so keep them in sync: `/categories/rupdate`, `/groups/rupdate`, `/reports/stock-oroduct`, mixed `/purchase-orders` and `/purchaseOrder` prefixes, and `/v1/roles` vs `/roles/all`.

## Documentation drift

`README.md` and `CLAUDE.md` describe an older state of the code:

| They say | Actual |
|---|---|
| Classic NgRx `+state/` and Signal Store coexist mid-migration | The migration is complete. Every domain is a root Signal Store and no `+state/` folders remain. |
| `provide<Domain>DataAccess()` in route `providers:` | Not used. Stores are `providedIn: 'root'`. |
| Clarity is the main UI kit, loaded via `importProvidersFrom` | Angular Material 3 + Tailwind. Only `NgSelectModule` is imported via `importProvidersFrom`. |
| `AuthGuard` class, `TokenInterceptorService` | Functional `authGuard` and `tokenInterceptor`. |
| A `stations` domain | Stations are handled by `configurations`. |

Update those files, or point them at this `docs/` folder.
