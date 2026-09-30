import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PurchasesReportGrvVsPurchasesDetailComponent } from './purchases-report-grv-vs-purchases-detail.component';

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

describe('PurchasesReportGrvVsPurchasesDetailComponent', () => {
  let component: PurchasesReportGrvVsPurchasesDetailComponent;
  let fixture: ComponentFixture<PurchasesReportGrvVsPurchasesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesReportGrvVsPurchasesDetailComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportGrvVsPurchasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
