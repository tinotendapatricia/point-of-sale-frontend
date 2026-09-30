import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { StockTakeForPeriodComponent } from './stock-take-for-period.component';

const reportStore = {
  stockLoading: () => false,
  getAdjustmentReport: jest.fn(),
  getAdjustmentVsBatchReport: jest.fn(),
  getBatchReport: jest.fn(),
  getCurrentStockListing: jest.fn(),
  getStockTakesForPeriod: jest.fn(),
};

describe('StockTakeForPeriodComponent', () => {
  let component: StockTakeForPeriodComponent;
  let fixture: ComponentFixture<StockTakeForPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTakeForPeriodComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeForPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
