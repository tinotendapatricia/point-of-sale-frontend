import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStore } from '../services/dashboard.store';
import { TopSellingProductComponent } from './top-selling-product.component';

describe('TopSellingProductComponent', () => {
  let component: TopSellingProductComponent;
  let fixture: ComponentFixture<TopSellingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSellingProductComponent],
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

    fixture = TestBed.createComponent(TopSellingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
