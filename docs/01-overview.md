# 1. Overview

## What the system is

This repo is the **web frontend** of a point-of-sale (POS) system for a retail or wholesale business. It talks to a separate backend REST API, which defaults to `http://localhost:4000`. The backend stores all data, calculates VAT, generates the PDF and Excel reports, and issues invoice numbers. This frontend handles screens, forms and workflow only.

There are two working applications plus one placeholder:

| App | Used by | Purpose |
|---|---|---|
| **Admin Portal** (`apps/admin-portal`) | Managers and back-office staff | Set up and run the business: products and prices, currencies and rates, suppliers and purchasing, receiving stock, stock takes, customer accounts, till stations, users and roles, reports, audit trail, company and licence details. |
| **Customer Portal / Till** (`apps/customer-portal`) | Cashiers | Ring up sales and refunds at a till station. |
| Licensing System (`apps/licensing-system`) | n/a | Empty Nx scaffold. Not built yet. |

Both apps are Angular single-page apps with **hash URLs** (for example `http://host/#/products`), so they can be served from any static file host.

## How the pieces fit

```
 ┌──────────────────────┐        ┌──────────────────────┐
 │  Admin Portal (SPA)  │        │   Till / Customer    │
 │  managers            │        │   Portal (SPA)       │
 └──────────┬───────────┘        └──────────┬───────────┘
            │  HTTPS / JSON, Authorization: Bearer <JWT>
            │                    Key: Bearer <licence key>
            ▼                               ▼
 ┌─────────────────────────────────────────────────────┐
 │         Backend REST API  (BASE_URL, :4000)         │
 │  auth · products · prices/costs · currencies/rates  │
 │  debtors · creditors · purchase orders · GRV        │
 │  stock take · invoices · cash-up · reports (PDF/XLS)│
 └─────────────────────────────────────────────────────┘
```

Both apps share the same libraries (`libs/`): data-access stores, UI components, auth and HTTP handling. A change to a shared store affects both apps.

## Key business concepts (glossary)

| Term | Meaning in this system |
|---|---|
| **Product** | A stock item with a code, barcode, name, quantity on hand, and dated **price** and **cost** histories (`price[]`, `cost[]` of `{value, effectiveDate}`). The screens use the first entry as the current one. |
| **Break bulk** | Turn a quantity of a parent product (for example a case) into a child product (for example single units), using the parent's pack size. |
| **Currency / Rate** | Currencies the business trades in. One is the **default (base) currency**. Each currency has a dated exchange rate against the base. |
| **Debtor** | A customer **account**. Every sale is made against a debtor, and the debtor's currency decides the exchange rate used at the till. Because the till has no separate currency picker, one way to handle walk-in customers is a cash debtor per currency. |
| **Creditor** | A supplier. Purchase orders are raised against creditors. |
| **Purchase Order (PO)** | An order to a supplier for products at a unit cost. It has an order number (PON). |
| **GRV (Goods Received Voucher)** | Recording what actually arrived against a PO. Receiving updates stock. |
| **Stock take batch** | A numbered batch of physical counts. It is compared with system stock, and the variance is posted as a **stock adjustment** (which has its own adjustment number). |
| **Station / Configuration** | A till terminal, identified by a **station number** (≥ 50), with a name, printer name and receipt copies. A till browser must be set to a configured station number before anyone can log in on it. |
| **Invoice** | A completed till transaction. `transactionType` 1 means sale and 2 means refund. Created by `POST /invoices/create`. |
| **Cash-up** | End-of-day count of the money in a till, by currency and denomination. Done from the admin portal (Sales Reports → Till Cashup). |
| **Licence** | A licence key stored on the company record. The frontend sends it on every request in the `Key` header. Login screens warn when it is close to expiry. |
| **Role** | A named permission (for example `MANAGE_PRODUCTS`) assigned to users. The **backend** enforces roles. The frontend does not hide screens based on role. |

## End-to-end business flow

```
 Setup (admin)                 Buying (admin)                 Selling (till)            Control (admin)
 ─────────────                 ──────────────                 ──────────────            ───────────────
 Company + licence             Creditor (supplier)            Station configured        Sales reports
 Currencies + rates     ──▶    Purchase order (PO)    ──▶     Cashier logs in    ──▶    Till cash-up
 Debtors (accounts)            Receive goods (GRV)            Pick account               Stock take + adjust
 Products, cost, price         → stock goes up                Scan/add products          Stock / purchase reports
 Stations, users, roles                                       Tender → invoice           Audit trail
                                                              → stock goes down
```

1. **Set up** (admin): enter company details and licence; create currencies, set the default and enter rates; create debtor accounts, products (then their cost and price), till stations, users and roles.
2. **Buy stock** (admin): create a purchase order for a supplier, then receive the goods against the PO number (GRV). Receiving increases stock.
3. **Sell** (till): the cashier picks the customer account, adds products, tenders and processes. The backend creates an invoice and reduces stock. Refunds use the same screen in refund mode.
4. **Control** (admin): run the daily cash-up per station, run sales, purchase and stock reports (PDF or Excel), do periodic stock takes to fix stock levels, and review the audit trail.

## Where to go next

- Using the system: read the [Admin Portal guide](02-admin-portal-guide.md) or the [Till guide](03-till-guide.md).
- Changing the system: read the [Architecture](04-architecture.md) and [Development guide](06-development-guide.md).
