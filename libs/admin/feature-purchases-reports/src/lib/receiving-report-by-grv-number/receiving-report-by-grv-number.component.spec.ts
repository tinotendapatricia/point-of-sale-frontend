import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { ReceivingReportByGrvNumberComponent } from './receiving-report-by-grv-number.component';

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

describe('ReceivingReportByGrvNumberComponent', () => {
  let component: ReceivingReportByGrvNumberComponent;
  let fixture: ComponentFixture<ReceivingReportByGrvNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivingReportByGrvNumberComponent],
      providers: [{ provide: ReportStore, useValue: reportStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivingReportByGrvNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
