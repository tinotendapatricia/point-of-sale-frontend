import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { ADMIN_FEATURE_STOCK_REPORTS_ROUTES } from '../admin-feature-stock-reports.routes';

describe('StockReportsContainerComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(ADMIN_FEATURE_STOCK_REPORTS_ROUTES),
        provideNoopAnimations(),
        { provide: ReportStore, useValue: { stockLoading: () => false } },
      ],
    });
    harness = await RouterTestingHarness.create('/');
  });

  it('lists every report in the side nav', () => {
    const links = harness.routeNativeElement!.querySelectorAll('pos-frontend-report-nav a');
    expect(links).toHaveLength(5);
  });

  it('shows the selected report title above it', () => {
    const first = harness.routeNativeElement!.querySelector('pos-frontend-report-nav .report-label')!.textContent;
    expect(harness.routeNativeElement!.querySelector('.report-title')!.textContent).toBe(first);
  });

  it('opens the first report by default', () => {
    expect(harness.routeNativeElement!.querySelector('pos-frontend-current-stock-listing-report')).toBeTruthy();
  });
});
