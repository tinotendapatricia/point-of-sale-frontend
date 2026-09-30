import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStore } from '../services/dashboard.store';
import { LowSellingProductComponent } from './low-selling-product.component';

describe('LowSellingProductComponent', () => {
  let component: LowSellingProductComponent;
  let fixture: ComponentFixture<LowSellingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowSellingProductComponent],
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

    fixture = TestBed.createComponent(LowSellingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
