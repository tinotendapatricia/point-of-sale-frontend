import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ProductStore } from '@pos-frontend/products/data-access';
import { StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { ADMIN_FEATURE_STOCK_TAKE_ROUTES } from '../admin-feature-stock-take.routes';

describe('StockTakeContainerComponent', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(ADMIN_FEATURE_STOCK_TAKE_ROUTES),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: { products: () => [], getAllProducts: jest.fn() } },
        {
          provide: StockTakeStore,
          useValue: {
            stockTakeBatch: () => undefined,
            createLoading: () => false,
            addProductsLoading: () => false,
            batchProducts: () => [],
            getBatchProductsLoading: () => false,
            adjustLoading: () => false,
          },
        },
      ],
    });
    harness = await RouterTestingHarness.create('/');
  });

  it('lists both steps in the side nav', () => {
    expect(harness.routeNativeElement!.querySelectorAll('pos-frontend-report-nav a')).toHaveLength(2);
  });

  it('opens the batch step by default', () => {
    expect(harness.routeNativeElement!.querySelector('pos-frontend-create-stock-batch')).toBeTruthy();
    expect(harness.routeNativeElement!.querySelector('.report-title')!.textContent).toBe('Create Stock Batch');
  });

  it('switches to the comparison step', async () => {
    await harness.navigateByUrl('/compare');
    expect(harness.routeNativeElement!.querySelector('pos-frontend-stock-take')).toBeTruthy();
  });
});
