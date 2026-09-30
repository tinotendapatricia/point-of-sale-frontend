import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStore } from '../services/dashboard.store';
import { LowStockProductsComponent } from './low-stock-products.component';

describe('LowStockProductsComponent', () => {
  let component: LowStockProductsComponent;
  let fixture: ComponentFixture<LowStockProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockProductsComponent],
      providers: [
        {
          provide: DashboardStore,
          useValue: {
            recentTransactions: () => [],
            recentTransactionsLoading: () => false,
            getRecentTransactions: jest.fn(),
            lowSelling: () => [],
            lowSellingLoading: () => false,
            getLowSelling: jest.fn(),
            topSelling: () => [],
            topSellingLoading: () => false,
            getTopSelling: jest.fn(),
            lowStock: () => [],
            lowStockLoading: () => false,
            getLowStock: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
