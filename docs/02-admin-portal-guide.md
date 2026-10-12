# 2. Admin Portal guide

The Admin Portal is the back-office app (`npx nx serve admin-portal`, http://localhost:4200). Every page except the login page needs a signed-in user.

- [Logging in and the licence](#logging-in-and-the-licence)
- [Layout and navigation](#layout-and-navigation)
- [Dashboard](#dashboard)
- [Products and break bulk](#products-and-break-bulk)
- [Currencies and exchange rates](#currencies-and-exchange-rates)
- [Purchases: creditors, purchase orders, receiving](#purchases)
- [Sales: debtors and sales reports, including till cash-up](#sales)
- [Stock management: stock take and stock reports](#stock-management)
- [User management: users and roles](#user-management)
- [Configurations (till stations)](#configurations-till-stations)
- [Company](#company)
- [Audit trail](#audit-trail)
- [Categories (hidden page)](#categories-hidden-page)

---

## Logging in and the licence

**URL:** `#/auth/login`

- Enter **Username** and **Password**, then click **Login**. On success you land on the Dashboard.
- There is no self-service password reset. The page says *"Forgot Password? Please contact admin"*, so an administrator resets passwords from **Users → Edit**.
- When the page opens, the company record is loaded and its **licence key** is stored for the session. Every later request sends it to the backend.
- A banner warns when the licence expires within 8 days.
- The floating **key button** opens the **Licence** dialog. Enter a new licence key there to renew. The dialog also shows the current *Active until* date.

**Session:** the login lasts for the browser tab (`sessionStorage`). Closing the tab, clicking **Log out**, or getting a 401 from the backend signs you out.

## Layout and navigation

- **Header:** the system name (links to the Dashboard), the **default currency** code, and an account menu with *Log out*.
- **Side navigation**, in order:

| Menu | Items |
|---|---|
| Dashboard | |
| Products Management | Products · Break |
| Currencies | |
| Purchases | Creditors · Purchase Orders · Receive Products · Reports |
| Sales | Debtors · Reports |
| Stock Management | Stock Take · Reports |
| User Management | Users · Roles |
| Configurations | |
| Company | |
| Audit Trail | |

**Common list-page behaviour:**
- Lists are paged tables. Use the paginator at the bottom (10, 25 or 100 rows per page).
- **Refresh** reloads the list. **Add New** opens the create form.
- Create and edit forms open as a dialog or a side panel ("drawer"). Saving shows a green toast and closes the form.
- The admin portal has no search, filter or delete on its list pages. Roles are the one exception: they can be deleted. Lists don't export; exports are on the report pages.

## Dashboard

**URL:** `#/dashboard` · read-only.

- **Recent Transactions:** latest invoices with invoice number, amount and debtor.
- **Low Selling Products:** products with the lowest quantities sold.

## Products and break bulk

**URL:** `#/products`

**List columns:** Code, Name, Barcode, Quantity (on hand), Current Unit Cost, Current Unit Price, Status (Active or Inactive).

| Action | How | Notes |
|---|---|---|
| Add product | **Add New** | Name, Code, Barcode (all required), Active (Yes/No). A new product has no cost or price until you set them. |
| Edit product / activate / deactivate | Pencil icon | Same form. Use the **Active** radio to enable or disable the product. |
| Update cost | ⋮ → *Update Cost* | New cost (≥ 0) and an optional **Effective Date**. Adds an entry to the cost history. |
| Update price | ⋮ → *Update Price* | New selling price (≥ 0) and an optional Effective Date. Adds an entry to the price history. |

> Set a price before selling a product, because the till reads the product's current price. Products with quantity below 1 are greyed out at the till, so receive stock first (see [Receive Products](#receive-products-grv-receive-products)).

**Break bulk:** `#/products/break-bulk` (menu *Products Management → Break*)

Use this to turn a bulk item into single units. For example, break 2 cases of 24 into 48 singles.

| Field | Meaning |
|---|---|
| Parent product | The bulk item to break down. Shows *Out of stock* when its quantity is 0. |
| Child product | The item that receives the units. |
| Quantity | How many parent units to break. |
| Parent size | How many child units one parent holds. |

## Currencies and exchange rates

**URL:** `#/currencies`

**List columns:** Code, Name, Symbol, Rate to Default, Default (Yes/No).

| Action | How | Notes |
|---|---|---|
| Add currency | **Add New** | Name, Code (for example USD), Symbol (for example $). |
| Edit | Pencil icon | |
| Make default | ⋮ → *Make Default Currency* | Asks you to confirm. The default currency is the **base**: product prices are held in it and the header shows it. |
| Update rate | ⋮ → *Update Rate* | Rate against the default currency, plus an optional effective date. The till uses this rate to convert totals for debtors billed in this currency. |

## Purchases

### Creditors (suppliers): `#/creditors`
- **Columns:** Account, Name, Address.
- **Add New / Edit** fields: Account and Name (required), Address, Description.

### Purchase Orders: `#/purchase-orders`
This page **creates** purchase orders. It has no list of existing POs; to see one, use *Purchases → Reports → Purchase Report By Order Number*.

1. **Supplier details:** pick the **Supplier** (required) and optionally enter a Reference.
2. **Items:** pick a product by code or name. The unit cost is filled in from the product's current cost and you can change it. Enter a quantity, then click **Add item**. You can't add the same product twice. In the items table you can still change quantity and unit cost, or remove a line.
3. Check **Total quantity** and **Order total**, then click **Create purchase order**. The new number is shown as *Last created: PON …*.

### Receive Products (GRV): `#/receive-products`
1. Enter the **Purchase Order number** and optionally a **Reference**, such as the supplier's invoice number. Click **Load order**.
2. For each line, enter the **Received** quantity. The table shows ordered quantity, unit cost, ordered value and received value.
3. Check the totals, then click **Receive goods**. The button needs at least one item received. Only lines with a received quantity are sent. **Stock increases.**

### Purchases reports: `#/purchases-reports`
Each report can be viewed in the browser, downloaded as **PDF**, or downloaded as **Excel**.

| Report | Inputs |
|---|---|
| Purchases vs GRV Summary For Period | From / To date |
| Purchases vs GRV Detailed | From / To date |
| Purchase Report By Order Number | PO number |
| Receiving By GRV Number | GRV number |

## Sales

### Debtors (customer accounts): `#/debtors`
- **Columns:** Account, Name, Discount.
- **Add New / Edit** fields: Name, Account, **Currency** (required), Discount % (0–100).
- The debtor's **currency** decides the exchange rate when the account is used at the till.

### Sales reports: `#/sales-reports`
Pick a report from the left menu. **View report** opens the PDF in a new tab. **PDF** and **Excel** download it. Leave Product or Debtor empty to report on all of them.

| Report | Inputs | Formats |
|---|---|---|
| All Sales Summary Listing For Period | dates | PDF, Excel |
| All Sales Detailed Listing For Period | dates | PDF, Excel |
| All Sales by Product and Day | dates, optional product | PDF, Excel |
| Sales by Debtor and Period | dates, optional debtor | PDF, Excel |
| Top Selling Product | dates | PDF |
| Gross Profit Report | dates, optional debtor | PDF |
| **Till Cashup** | see below | PDF |

**Till Cashup (end of day):**
1. Pick the **Till Station**. The list shows only stations with a pending cash-up.
2. For each currency card, enter the count for each note or coin denomination. The card total updates as you type. **Reset** clears a card.
3. Submit to generate the cash-up report.
4. To reprint an earlier cash-up, switch to **Print Previous Cashup** and enter the station and date.

## Stock management

### Stock take: `#/stock-take`
A stock take has two steps, shown in the left *Steps* menu.

**Step 1: Create Stock Batch**
1. Click **Initiate Stock Take**. The backend creates a batch and returns its **batch number**. Write it down.
2. Add each counted product with the quantity you counted. Duplicate products are rejected. You can edit or delete lines before closing.
3. Click **Close Batch** and confirm. The counts are saved to the batch.

**Step 2: Stock Take (compare and adjust)**
1. Enter the **Batch Number** and click **Compare with System Stock**.
2. Review each product's Batch Count, System Count and **Variance**.
3. Click **Adjust Stock** and confirm. System stock is set to the counted figures and an adjustment number is issued.

### Stock reports: `#/stocks` (PDF)

| Report | Input |
|---|---|
| Current Stock Listing | none |
| Print Batch | batch number |
| Print Stock Adjustment | adjustment number |
| Batch vs Adjustment | batch number |
| Stock Takes for Period | from / to date |

## User management

### Users: `#/users`
- **Columns:** Username, Name, Status (Active or Inactive).
- **Add New:** Username, Name, Password.
- **Edit:** same form. Leave Password blank to keep the current one, or enter a new one to reset it.
- **⋮ menu:**
  - *View details:* read-only profile.
  - *Manage permissions:* tick roles, or tick **Assign All**, then click **Save**.
  - *Activate* / *Deactivate:* asks you to confirm. Deactivated users can't log in.

### Roles: `#/roles`
- **Columns:** Name, Created By.
- **Add New / Edit** open in a side panel. The only field is Name, written as a permission code, for example `MANAGE_PRODUCTS`.
- **Delete** asks you to confirm. Users who hold the role lose its permissions.
- Role names must match what the backend checks. The frontend shows every screen to every signed-in user, and the backend rejects calls the user's roles don't allow, which shows a toast.

## Configurations (till stations)

**URL:** `#/configurations`

Each row is one till terminal.

| Field | Rule |
|---|---|
| Station Name | Required, for example "Front counter 1" |
| Station Number | Required, **≥ 50**. Enter this on the till machine (see the [Till guide](03-till-guide.md#1-first-time-station-setup)). |
| Printer Name | Required, the receipt printer name |
| Print Copies | Required, ≥ 1 |

A till can't log in until its station number appears here.

## Company

**URL:** `#/company`

Shows the business's legal details: Name, Email, BP Number, TIN Number, Phone, Address. Use **Add New** the first time and **Update** after that.

The **licence** is part of the company record. Renew it from the key button on the login page.

## Audit trail

**URL:** `#/audits` · read-only.

- **Columns:** Action, Actioned By, Date Created.
- The **eye icon** opens a side panel with the details of the record that changed. Passwords and internal IDs are hidden.

## Categories (hidden page)

**URL:** `#/categories`. The page works but has no menu entry, so type the URL to reach it.

Create and edit product categories here. Each category has a Name and a Code.
