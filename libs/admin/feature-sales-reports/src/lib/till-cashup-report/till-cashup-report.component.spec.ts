import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TillCashupReportComponent } from './till-cashup-report.component';

describe('TillCashupReportComponent', () => {
  let component: TillCashupReportComponent;
  let fixture: ComponentFixture<TillCashupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TillCashupReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TillCashupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
