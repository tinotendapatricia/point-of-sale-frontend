import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { SalesReportDetailedComponent } from './sales-report-detailed.component';

describe('SalesReportDetailedComponent', () => {
  let component: SalesReportDetailedComponent;
  let fixture: ComponentFixture<SalesReportDetailedComponent>;
  const reportStore = {
    salesLoading: () => false,
    getSalesDetailedPdf: jest.fn(),
    getSalesDetailedExcel: jest.fn(),
  };
  const value: ReportFormValue = {
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    debtor: null,
    product: null,
    orderNumber: null,
    grvNumber: null,
    batchNumber: null,
    adjustmentNumber: null,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [SalesReportDetailedComponent],
      providers: [provideNoopAnimations(), { provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesReportDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requests the detailed pdf and excel for the period', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    form.excelRequested.emit(value);
    const range = { fromDate: '2024-01-01', toDate: '2024-01-31' };
    expect(reportStore.getSalesDetailedPdf).toHaveBeenCalledWith(range);
    expect(reportStore.getSalesDetailedExcel).toHaveBeenCalledWith(range);
  });
});
