import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { AdjustmentVsBatchComponent } from './adjustment-vs-batch.component';

const reportStore = {
  stockLoading: () => false,
  getAdjustmentReport: jest.fn(),
  getAdjustmentVsBatchReport: jest.fn(),
  getBatchReport: jest.fn(),
  getCurrentStockListing: jest.fn(),
  getStockTakesForPeriod: jest.fn(),
};

describe('AdjustmentVsBatchComponent', () => {
  let component: AdjustmentVsBatchComponent;
  let fixture: ComponentFixture<AdjustmentVsBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustmentVsBatchComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdjustmentVsBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
