import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PurchasesReportGrvVsPurchasesSummaryComponent } from './purchases-report-grv-vs-purchases-summary.component';

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

describe('PurchasesReportGrvVsPurchasesSummaryComponent', () => {
  let component: PurchasesReportGrvVsPurchasesSummaryComponent;
  let fixture: ComponentFixture<PurchasesReportGrvVsPurchasesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesReportGrvVsPurchasesSummaryComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportGrvVsPurchasesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
