import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { StockReportsContainerComponent } from './stock-reports-container.component';

describe('StockReportsContainerComponent', () => {
  let component: StockReportsContainerComponent;
  let fixture: ComponentFixture<StockReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockReportsContainerComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: { stockLoading: () => false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the current stock listing tab first', () => {
    expect(
      fixture.nativeElement.querySelector('pos-frontend-current-stock-listing-report')
    ).toBeTruthy();
  });
});
