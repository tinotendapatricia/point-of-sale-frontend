import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchasesReportByOrderNumberComponent } from './purchases-report-by-order-number.component';

describe('PurchasesReportByOrderNumberComponent', () => {
  let component: PurchasesReportByOrderNumberComponent;
  let fixture: ComponentFixture<PurchasesReportByOrderNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesReportByOrderNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportByOrderNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
