import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PrintBatchComponent } from './print-batch.component';

const reportStore = {
  stockLoading: () => false,
  getAdjustmentReport: jest.fn(),
  getAdjustmentVsBatchReport: jest.fn(),
  getBatchReport: jest.fn(),
  getCurrentStockListing: jest.fn(),
  getStockTakesForPeriod: jest.fn(),
};

describe('PrintBatchComponent', () => {
  let component: PrintBatchComponent;
  let fixture: ComponentFixture<PrintBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintBatchComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrintBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
