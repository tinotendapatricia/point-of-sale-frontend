import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { CurrentStockListingReportComponent } from './current-stock-listing-report.component';

const reportStore = {
  stockLoading: () => false,
  getAdjustmentReport: jest.fn(),
  getAdjustmentVsBatchReport: jest.fn(),
  getBatchReport: jest.fn(),
  getCurrentStockListing: jest.fn(),
  getStockTakesForPeriod: jest.fn(),
};

describe('CurrentStockListingReportComponent', () => {
  let component: CurrentStockListingReportComponent;
  let fixture: ComponentFixture<CurrentStockListingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentStockListingReportComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentStockListingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
