import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PrintAdjustmentComponent } from './print-adjustment.component';

const reportStore = {
  stockLoading: () => false,
  getAdjustmentReport: jest.fn(),
  getAdjustmentVsBatchReport: jest.fn(),
  getBatchReport: jest.fn(),
  getCurrentStockListing: jest.fn(),
  getStockTakesForPeriod: jest.fn(),
};

describe('PrintAdjustmentComponent', () => {
  let component: PrintAdjustmentComponent;
  let fixture: ComponentFixture<PrintAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintAdjustmentComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrintAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
