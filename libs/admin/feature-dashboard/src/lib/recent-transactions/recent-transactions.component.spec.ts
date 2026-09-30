import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStore } from '../services/dashboard.store';
import { RecentTransactionsComponent } from './recent-transactions.component';

describe('RecentTransactionsComponent', () => {
  let component: RecentTransactionsComponent;
  let fixture: ComponentFixture<RecentTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTransactionsComponent],
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

    fixture = TestBed.createComponent(RecentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
