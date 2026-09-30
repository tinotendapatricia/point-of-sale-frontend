import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { SalesByDebtorComponent } from './sales-by-debtor.component';

describe('SalesByDebtorComponent', () => {
  let component: SalesByDebtorComponent;
  let fixture: ComponentFixture<SalesByDebtorComponent>;
  const reportStore = {
    salesLoading: () => false,
    getSalesByDebtorPdf: jest.fn(),
    getSalesByDebtorExcel: jest.fn(),
  };
  const debtorStore = { debtors: () => [], getAllDebtors: jest.fn() };
  const value: ReportFormValue = {
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    debtor: 3,
    product: null,
    orderNumber: null,
    grvNumber: null,
    batchNumber: null,
    adjustmentNumber: null,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [SalesByDebtorComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: reportStore },
        { provide: DebtorStore, useValue: debtorStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the debtors', () => {
    expect(component).toBeTruthy();
    expect(debtorStore.getAllDebtors).toHaveBeenCalled();
  });

  it('requests the report for the period and debtor', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    form.excelRequested.emit(value);
    const request = { fromDate: '2024-01-01', toDate: '2024-01-31', debtor: 3 };
    expect(reportStore.getSalesByDebtorPdf).toHaveBeenCalledWith(request);
    expect(reportStore.getSalesByDebtorExcel).toHaveBeenCalledWith(request);
  });
});
