import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStore } from '../services/dashboard.store';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
