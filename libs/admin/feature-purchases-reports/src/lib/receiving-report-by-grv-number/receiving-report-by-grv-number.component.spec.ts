import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceivingReportByGrvNumberComponent } from './receiving-report-by-grv-number.component';

describe('ReceivingReportByGrvNumberComponent', () => {
  let component: ReceivingReportByGrvNumberComponent;
  let fixture: ComponentFixture<ReceivingReportByGrvNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceivingReportByGrvNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivingReportByGrvNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
