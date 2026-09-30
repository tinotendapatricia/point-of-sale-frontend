import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { TopSellingProductsForPeriodComponent } from './top-selling-products-for-period.component';

describe('TopSellingProductsForPeriodComponent', () => {
  let component: TopSellingProductsForPeriodComponent;
  let fixture: ComponentFixture<TopSellingProductsForPeriodComponent>;
  const reportStore = { salesLoading: () => false, getTopSellingProducts: jest.fn() };
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
      imports: [TopSellingProductsForPeriodComponent],
      providers: [provideNoopAnimations(), { provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellingProductsForPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requests the top selling products for the period', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    expect(reportStore.getTopSellingProducts).toHaveBeenCalledWith({
      fromDate: '2024-01-01',
      toDate: '2024-01-31',
    });
  });
});
