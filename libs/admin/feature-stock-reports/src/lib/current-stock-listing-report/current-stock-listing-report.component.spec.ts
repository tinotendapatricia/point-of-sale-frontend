import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentStockListingReportComponent } from './current-stock-listing-report.component';

describe('CurrentStockListingReportComponent', () => {
  let component: CurrentStockListingReportComponent;
  let fixture: ComponentFixture<CurrentStockListingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentStockListingReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentStockListingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
