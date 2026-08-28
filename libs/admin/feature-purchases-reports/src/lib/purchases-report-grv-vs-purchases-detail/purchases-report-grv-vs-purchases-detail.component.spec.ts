import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasesReportGrvVsPurchasesDetailComponent } from './purchases-report-grv-vs-purchases-detail.component';

describe('PurchasesReportGrvVsPurchasesDetailComponent', () => {
  let component: PurchasesReportGrvVsPurchasesDetailComponent;
  let fixture: ComponentFixture<PurchasesReportGrvVsPurchasesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PurchasesReportGrvVsPurchasesDetailComponent],
}).compileComponents();

    fixture = TestBed.createComponent(
      PurchasesReportGrvVsPurchasesDetailComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
