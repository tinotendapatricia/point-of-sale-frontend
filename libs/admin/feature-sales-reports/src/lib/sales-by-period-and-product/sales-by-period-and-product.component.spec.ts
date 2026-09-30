import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { type ReportFormValue, ReportsFormComponent } from '@pos-frontend/reports/ui';

import { SalesByPeriodAndProductComponent } from './sales-by-period-and-product.component';

describe('SalesByPeriodAndProductComponent', () => {
  let component: SalesByPeriodAndProductComponent;
  let fixture: ComponentFixture<SalesByPeriodAndProductComponent>;
  const reportStore = {
    salesLoading: () => false,
    getSalesByProductPdf: jest.fn(),
    getSalesByProductExcel: jest.fn(),
  };
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const value: ReportFormValue = {
    fromDate: '2024-01-01',
    toDate: '2024-01-31',
    debtor: null,
    product: 7,
    orderNumber: null,
    grvNumber: null,
    batchNumber: null,
    adjustmentNumber: null,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [SalesByPeriodAndProductComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: reportStore },
        { provide: ProductStore, useValue: productStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByPeriodAndProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the products', () => {
    expect(component).toBeTruthy();
    expect(productStore.getAllProducts).toHaveBeenCalled();
  });

  it('requests the report for the period and product', () => {
    const form: ReportsFormComponent = fixture.debugElement.query(
      By.directive(ReportsFormComponent)
    ).componentInstance;
    form.pdfRequested.emit(value);
    form.excelRequested.emit(value);
    const request = { fromDate: '2024-01-01', toDate: '2024-01-31', product: 7 };
    expect(reportStore.getSalesByProductPdf).toHaveBeenCalledWith(request);
    expect(reportStore.getSalesByProductExcel).toHaveBeenCalledWith(request);
  });
});
