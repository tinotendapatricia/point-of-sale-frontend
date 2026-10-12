# 5. API reference

These are the backend endpoints the frontend calls. Every path below is relative to `BASE_URL` (default `http://localhost:4000`) and is called through `ApiService`. All requests carry `Authorization: Bearer <token>` and `Key: Bearer <licence>`.

**Conventions**
- **Paginated** (`…/paginated`, `…/list`, `/v1/roles`): query params `page` (0-based), `size`, and optionally `search`, `sort`, `order=ASC|DESC`. The response is `Page<T> = { content: T[], totalElements, totalPages, page }`.
- **`BaseEntity`**: `{ id, createdAt, updatedAt, createdBy?, updatedBy? }`.
- **Period** (dated value): `{ value: number, effectiveDate }`. The frontend treats index `[0]` as current.
- **Report endpoints** return a binary `Blob` (PDF or Excel).
- ✅ marks an endpoint that a routed screen uses today. The others exist in the service but are unused.

Service files live at `libs/<domain>/data-access/src/lib/<name>.service.ts`.

## Auth: `auth.service.ts`

| | Method | Path | Body → Response |
|---|---|---|---|
| ✅ | POST | `/auth/login` | `{username, password}` → `{token, userId}` |
| | POST | `/authenticate` | same (client login, unused) |
| | POST | `/register` | `{username, password, …}` |

## Company and licence: `company.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/company/one` | company record, including `license`, `licenseExpDate` |
| ✅ | POST | `/company/create` | |
| ✅ | PUT | `/company/update/{id}` | |
| ✅ | PUT | `/company/license` | `{license, id}` |
| | GET | `/company/license`, `/company/all` · DELETE `/company/{id}` | |

`CompanyEntity`: `name, email, bpNumber, tinNumber, phone, address, license, licenseExpDate`.

## Products: `product.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/products/paginated` | |
| ✅ | GET | `/products/all` | till, PO, stock take, reports |
| ✅ | POST | `/products/create/` | trailing slash is in the code |
| ✅ | PUT | `/products/update/{id}` | full product merged with form |
| ✅ | PUT | `/products/break` | `{parentId, childId, quantity, parentSize}` |
| ✅ | POST | `/costs/update-cost/{id}` | `{id, cost, effectiveDate}` |
| ✅ | POST | `/prices/update-price/{id}` | `{id, price, effectiveDate}` |
| | GET / DELETE | `/products/{id}` | |

`ProductsEntity`: `name, code, barcode, active, price: Period[], cost: Period[], taxable, quantity, reorderLevel, mass, measuredIn`.

## Categories: `category.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/categories/list` (paginated) |
| ✅ | POST | `/categories/create` |
| ✅ | GET | `/categories/{id}` |
| ✅ | PUT | `/categories/rupdate/{id}` (the backend path really is "rupdate") |
| | GET `/categories/all` · DELETE `/categories/{id}` · PUT `/categories/assign-roles/{id}` | |

`CategoryEntity`: `name, code`.

## Currencies and rates: `currency.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/currencies/paginated` | |
| ✅ | GET | `/currencies/all` | |
| ✅ | GET | `/currencies/default` | headers, till |
| ✅ | POST | `/currencies/create` | `isDefault: false` |
| ✅ | PUT | `/currencies/update/{id}` | |
| ✅ | PATCH | `/currencies/default/{id}` | make default |
| ✅ | PUT | `/rates/update/{id}` | `{id, rate, effectiveDate}` |
| | GET / DELETE | `/currencies/{id}` | |

`CurrencyEntity`: `code, name, symbol, rate, isDefault`.

## Debtors (customers): `debtor.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/debtors/paginated` |
| ✅ | GET | `/debtors/all` |
| ✅ | POST | `/debtors/create` |
| ✅ | PUT | `/debtors/update/{id}` |
| | GET / DELETE `/debtors/{id}` · PUT `/debtors/assign-roles/{id}` | |

`DebtorsEntity`: `name, account, discount, currency: {id, name, code, symbol, rate: Period[]}`. Requests send `currency` as an id.

## Creditors (suppliers): `creditor.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/creditors/paginated` |
| ✅ | GET | `/creditors/all` |
| ✅ | POST | `/creditors/create` |
| ✅ | PUT | `/creditors/update/{id}` |
| | GET / DELETE `/creditors/{id}` · PUT `/creditors/assign-roles/{id}` | |

`CreditorsEntity`: `name, account, contact, address, description?`.

## Purchase orders and receiving: `purchase-order.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | POST | `/purchase-orders/create` | `{creditor, reference, totalAmount, totalQty, products[{product, code, description, quantityPurchased, quantity, cost, value}]}` |
| ✅ | GET | `/purchase-orders/{orderNumber}` | returns receivable lines |
| ✅ | PUT | `/receive/products` | GRV: `{purchaseOrderNumber, reference, totalAmount, totalQty, products[{product, name, quantity, amount, qtyReceived, unitCost, receivedValue}]}` |
| | GET | `/purchase-orders/paginated` | |
| | GET `/purchaseOrder/all` · DELETE `/purchaseOrder/{id}` · PUT `/purchaseOrder/assign-roles/{id}` | | mixed prefix |

`PurchaseOrderEntity`: `orderNumber, date, received, creditor, amountBeforeVat, vatAmount, amountAfterVat, products[{product, quantityPurchased, quantityReceived, received, variance, purchasedBy, receivedBy}]`.

## Stock take: `stock-take.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | POST | `/stock-take/create` | body `{}` → `{batchNumber, …}` |
| ✅ | POST | `/stock-take/add-product-to-batch` | `{batchNumber, products}` |
| ✅ | GET | `/stock-take/get-batch-products/{batchNumber}` | `[{id, code, productName, quantity}]` |
| ✅ | POST | `/stock-adjustment/adjust` | `{batchNumber, values[{product, quantity, adjustedOnBatch}], adjustedValues[{productId, name, batchCount, systemCount, variance}]}` → `{adjustment: {number}}` |

## Till / invoices: `pos.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | POST | `/invoices/create` |

`CreateSaleRequest`:
```ts
{
  products: { code, description, productId, quantity, price, cost, totalAmt }[],
  totalAmountExcVat, totalVat /* 0, backend calculates */, total,
  debtor, station, rate,
  transactionType: 1 /* sale */ | 2 /* refund */,
  reference /* string | null */,
  changeDebtor, changeRate, changeAmount   // foreign-currency change, else null
}
```
Response `PosEntity`: `invoiceNumber, totalAmountExcVat, totalVat, total, debtor, products[]`.

## Configurations (stations) and cash-up: `configuration.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/configurations/all` |
| ✅ | POST | `/configurations/create` |
| ✅ | PUT | `/configurations/update/{id}` |
| ✅ | GET | `/cash-up/pending` → `[{station, tDate}]` |
| | GET `/configurations/paginated` · GET / DELETE `/configurations/{id}` · PUT `/configurations/assign-roles/{id}` | |

`ConfigurationsEntity`: `stationName, stationNumber, printerName, copies`.

## Users: `user.service.ts`

| | Method | Path | Notes |
|---|---|---|---|
| ✅ | GET | `/users/paginated` | `page, size, group?` |
| ✅ | GET | `/users/by-id/{id}` | |
| ✅ | GET | `/users/my-account` | till header |
| ✅ | POST | `/users/create` | `{username, name, password}` |
| ✅ | PUT | `/users/update` | `{id, username, name, password?}` |
| ✅ | PATCH | `/v1/users/{userId}` | activate/deactivate (`status`) |
| ✅ | PUT | `/users/assign-roles/{userId}` | `{userId, roles: string[]}` |
| | GET `/users/all` · PUT `/v1/accounts/my-account` · GET `/client/v1/users/profile` | | |

`UsersEntity`: `id, username, name, active, locked, roles: RolesEntity[], createdBy, createdDate, lastModifiedBy, lastModifiedDate, version`.

## Roles: `role.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/v1/roles` (paginated) |
| ✅ | POST | `/v1/roles` |
| ✅ | PUT | `/v1/roles/{id}` |
| ✅ | DELETE | `/v1/roles/{id}` |
| ✅ | GET | `/roles/all` (no `/v1`) |
| | GET | `/v1/roles/{id}` |

`RolesEntity`: `id, name, createdBy`.

## Audit trail: `audit.service.ts`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/audits/paginated` |

`AuditsEntity`: `id, name, actionedBy, resource (object), createdAt, updatedAt`.

## Dashboard: `libs/admin/feature-dashboard/src/lib/services/`

| | Method | Path |
|---|---|---|
| ✅ | GET | `/dashboard/recent-transactions` |
| ✅ | GET | `/dashboard/low-selling` |
| | GET | `/dashboard/top-selling`, `/dashboard/low-stock` (widgets built but not on the page) |

## Reports: `report.service.ts` (all return a Blob)

An empty product or debtor is sent as `0`, meaning "all".

**Sales**

| | Path (GET) |
|---|---|
| ✅ | `/sales-reports/summary-listing/{from}/{to}` · `/sales-reports/summary-listing-excel/{from}/{to}` |
| ✅ | `/sales-reports/detailed-listing/{from}/{to}` · `/sales-reports/detailed-listing-excel/{from}/{to}` |
| ✅ | `/sales-reports/by-product-pdf/{from}/{to}/{product}` · `/sales-reports/by-product-excel/{from}/{to}/{product}` |
| ✅ | `/sales-reports/by-debtor-pdf/{from}/{to}/{debtor}` · `/sales-reports/by-debtor-excel/{from}/{to}/{debtor}` |
| ✅ | `/sales-reports/top-selling/{from}/{to}` |
| ✅ | `/sales-reports/gross-profit/{from}/{to}/{debtor}` |
| ✅ | **POST** `/cash-up/generate`: `{cashup: [{code, total}], station, tDate}` |

**Purchases**

| | Path (GET) |
|---|---|
| ✅ | `/purchase-order-reports/purchases-grv-summary-pdf/{from}/{to}` · `…-excel/{from}/{to}` |
| ✅ | `/purchase-order-reports/purchases-grv-detail-pdf/{from}/{to}` · `…-excel/{from}/{to}` |
| ✅ | `/purchase-order-reports/by-order-number-pdf/{n}` · `…-excel/{n}` |
| ✅ | `/purchase-order-reports/by-grv-number-pdf/{n}` · `…-excel/{n}` |

**Stock**

| | Path (GET) |
|---|---|
| ✅ | `/stock-reports/current-stock-listing` |
| ✅ | `/stock-reports/batch/{batchNumber}` |
| ✅ | `/stock-reports/adjustment/{adjustmentNumber}` |
| ✅ | `/stock-reports/adjustment-vs-batch/{batch}` |
| ✅ | `/stock-reports/adjustment-vs-batch/period/{from}/{to}` |
| | `/reports/stock-movement-product/{p}`, `/reports/stock-oroduct/{p}` (backend spelling), `/reports/stock-movement-product/{from}/{to}/{p}`, `/reports/stock-movement-period/{from}/{to}` |

## Not routed: groups and VAT

- **Groups** (`group.service.ts`): `/groups/list`, `/groups/all`, `/groups/create`, `/groups/{id}`, `/groups/rupdate/{id}`, `/groups/assign-roles/{id}`.
- **VAT** (`vat.service.ts`): GET `/vat/all` (single `{vat}`), PUT `/vat/update/{id}`.
