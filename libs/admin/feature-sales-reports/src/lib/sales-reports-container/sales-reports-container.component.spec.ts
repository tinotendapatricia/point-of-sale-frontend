import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { ADMIN_FEATURE_SALES_REPORTS_ROUTES } from '../admin-feature-sales-reports.routes';

describe('SalesReportsContainerComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(ADMIN_FEATURE_SALES_REPORTS_ROUTES),
        provideNoopAnimations(),
        {
          provide: ReportStore,
          useValue: { salesLoading: () => false, cashupLoading: () => false },
        },
        { provide: ProductStore, useValue: { products: () => [], getAllProducts: jest.fn() } },
        { provide: DebtorStore, useValue: { debtors: () => [], getAllDebtors: jest.fn() } },
        {
          provide: CurrencyStore,
          useValue: { currencies: () => [], getAllCurrencies: jest.fn() },
        },
        {
          provide: ConfigurationStore,
          useValue: { pendingCashups: () => [], getPendingCashups: jest.fn() },
        },
      ],
    });
    harness = await RouterTestingHarness.create('/');
  });

  it('lists every report in the side nav', () => {
    const links = harness.routeNativeElement!.querySelectorAll('pos-frontend-report-nav a');
    expect(links).toHaveLength(7);
  });

  it('shows the selected report title above it', () => {
    const first = harness.routeNativeElement!.querySelector('pos-frontend-report-nav .report-label')!.textContent;
    expect(harness.routeNativeElement!.querySelector('.report-title')!.textContent).toBe(first);
  });

  it('opens the first report by default', () => {
    expect(harness.routeNativeElement!.querySelector('pos-frontend-all-sales-reports')).toBeTruthy();
  });
});
