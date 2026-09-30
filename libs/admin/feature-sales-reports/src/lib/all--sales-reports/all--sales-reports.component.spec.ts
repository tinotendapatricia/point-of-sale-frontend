import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { AllSalesReportsComponent } from './all--sales-reports.component';

describe('AllSalesReportsComponent', () => {
  let component: AllSalesReportsComponent;
  let fixture: ComponentFixture<AllSalesReportsComponent>;
  const reportStore = {
    salesLoading: () => false,
    getSalesSummaryPdf: jest.fn(),
    getSalesSummaryExcel: jest.fn(),
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
      imports: [AllSalesReportsComponent],
      providers: [provideNoopAnimations(), { provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AllSalesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requests the summary pdf and excel for the period', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    form.excelRequested.emit(value);
    const range = { fromDate: '2024-01-01', toDate: '2024-01-31' };
    expect(reportStore.getSalesSummaryPdf).toHaveBeenCalledWith(range);
    expect(reportStore.getSalesSummaryExcel).toHaveBeenCalledWith(range);
  });
});
