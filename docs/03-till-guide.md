# 3. Till (Customer Portal) guide

The till is the cashier-facing app (`npx nx serve customer-portal`). It has three screens: **Login**, **Sale** (`#/pos`) and **Refund** (`#/refund`).

## 1. First-time station setup

Each browser or machine used as a till must be tied to a **station** that an admin has created under *Admin → Configurations*.

1. On the till login screen, click the **Station = …** link.
2. Enter the station number, for example `50`. The number is accepted only if it matches a configured station.
3. The number is saved in the browser's `localStorage`, so it survives logouts and restarts. You only need to do this again if the browser data is cleared or the machine moves to a different station.

If the station isn't set, or isn't in the configuration list, login is refused with *"This till station is not configured"*.

## 2. Logging in

- Enter Username and Password and click **Login**. Cashiers use the same user accounts as the admin portal.
- The login screen also checks the company **licence**. It warns when the licence expires within 8 days.
- After login the **Sale** screen opens. The header shows the Sale and Refund tabs, the station number, the base currency and the cashier's name, plus **Log out**.

## 3. Ringing up a sale

When the Sale screen opens, it loads the product list (with stock levels), the debtor accounts and the default currency.

1. **Select the account (debtor) first.** Product entry stays disabled until you do (*"Select an account first"*).
   - The account's **currency** sets the exchange rate for the whole sale. Prices are held in the base currency and converted with that rate.
2. **Add products:**
   - Click the **Product** box and type, or scan with a barcode scanner. The search matches name, code and barcode.
   - Optionally set **Quantity** first. Empty or 0 means 1.
   - Choosing a product, or pressing **Enter**, adds the line.
   - Products with quantity below 1 show *Out of stock* and can't be picked.
   - Adding the same product again creates a **separate line**, not a bigger quantity.
   - To change a quantity, remove the line and add it again. You can't edit a line once it is added.
3. Optionally enter a **Reference**.
4. Check the summary panel: item count and **TOTAL DUE** in the account's currency.
5. **Cancel transaction** clears everything and starts again.

> VAT is worked out by the **backend** when the invoice is created. The till sends VAT as 0 and doesn't apply debtor discounts.

## 4. Tendering

Click **Charge {amount}**. It is enabled once there is an account and at least one item.

| Field | Use |
|---|---|
| Amount offered | What the customer handed over, in the sale currency. Required. |
| Foreign change? | **No**: change is given in the sale currency. **Yes**: pick a **change account**, and the change is converted with that account's currency rate. Use this when the customer pays in one currency and takes change in another. |

- The change is shown live. It turns red if the amount offered is too low. The till doesn't block underpayment, so check before processing.
- The till has one tender per sale. It has no split payments and no cash, card or mobile money choice.
- Click **Process and print** to submit, or **Back** to return to the cart.

**After processing:**
- The backend creates the invoice and you see *"Sale processed successfully"*.
- The summary shows *"Invoice N created. Next customer."*
- The cart clears and the product list reloads, so stock levels are up to date.
- If it fails you see *"Failed to process transaction"*, and the cart is kept so you can retry.

> **Receipts:** the till doesn't render or print receipts in the browser. Any printing (using the station's configured printer and copies) is the backend's job.

## 5. Refunds

Open the **Refund** tab. It is the same screen as a sale, in refund mode:

1. Select the **same account** the original sale was made to.
2. Add the products and quantities being returned.
3. Enter the original invoice number in **Reference**. The till doesn't look up the original sale, so the reference is your audit link.
4. Click **Refund {amount}**, complete the tender step, and click **Process refund**.

The backend records the invoice as a refund (`transactionType 2`).

## 6. End of shift

- Click **Log out** in the header. This clears the session but keeps the station number.
- The till has no shift open or close. The **cash-up** is done by a supervisor in the Admin Portal (*Sales → Reports → Till Cashup*).

## 7. What the till does not do (yet)

- Work offline: every action needs the backend.
- Integrate hardware beyond a keyboard-style barcode scanner: no cash drawer, customer display or direct printer control.
- Fiscalisation (fiscal device signatures).
- Look up the original invoice for a refund.
- Use keyboard shortcuts beyond Enter and Tab.
