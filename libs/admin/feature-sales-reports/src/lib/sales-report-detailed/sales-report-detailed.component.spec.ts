import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesReportDetailedComponent } from './sales-report-detailed.component';

describe('SalesReportDetailedComponent', () => {
  let component: SalesReportDetailedComponent;
  let fixture: ComponentFixture<SalesReportDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SalesReportDetailedComponent],
}).compileComponents();

    fixture = TestBed.createComponent(SalesReportDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
