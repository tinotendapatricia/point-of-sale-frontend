import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { GenerateGpReportComponent } from './generate-gp-report.component';

describe('GenerateGpReportComponent', () => {
  let component: GenerateGpReportComponent;
  let fixture: ComponentFixture<GenerateGpReportComponent>;
  const reportStore = { salesLoading: () => false, getGrossProfitReport: jest.fn() };
  const debtorStore = { debtors: () => [], getAllDebtors: jest.fn() };
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
      imports: [GenerateGpReportComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: reportStore },
        { provide: DebtorStore, useValue: debtorStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateGpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the debtors', () => {
    expect(component).toBeTruthy();
    expect(debtorStore.getAllDebtors).toHaveBeenCalled();
  });

  it('requests the gross profit report', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    expect(reportStore.getGrossProfitReport).toHaveBeenCalledWith({
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
      debtor: null,
    });
  });
});
