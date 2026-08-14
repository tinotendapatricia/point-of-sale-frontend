import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasesReportGrvVsPurchasesSummaryComponent } from './purchases-report-grv-vs-purchases-summary.component';

describe('PurchasesReportGrvVsPurchasesSummaryComponent', () => {
  let component: PurchasesReportGrvVsPurchasesSummaryComponent;
  let fixture: ComponentFixture<PurchasesReportGrvVsPurchasesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesReportGrvVsPurchasesSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PurchasesReportGrvVsPurchasesSummaryComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
