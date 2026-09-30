import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PurchasesReportByOrderNumberComponent } from './purchases-report-by-order-number.component';

const reportStore = {
  purchasesLoading: () => false,
  getGrvExcel: jest.fn(),
  getGrvPdf: jest.fn(),
  getPurchaseOrderExcel: jest.fn(),
  getPurchaseOrderPdf: jest.fn(),
  getPurchasesVsGrvDetailExcel: jest.fn(),
  getPurchasesVsGrvDetailPdf: jest.fn(),
  getPurchasesVsGrvSummaryExcel: jest.fn(),
  getPurchasesVsGrvSummaryPdf: jest.fn(),
};

describe('PurchasesReportByOrderNumberComponent', () => {
  let component: PurchasesReportByOrderNumberComponent;
  let fixture: ComponentFixture<PurchasesReportByOrderNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesReportByOrderNumberComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportByOrderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
