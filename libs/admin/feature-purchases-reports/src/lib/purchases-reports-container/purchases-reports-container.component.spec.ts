import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { PurchasesReportsContainerComponent } from './purchases-reports-container.component';

describe('PurchasesReportsContainerComponent', () => {
  let component: PurchasesReportsContainerComponent;
  let fixture: ComponentFixture<PurchasesReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasesReportsContainerComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: { purchasesLoading: () => false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the purchases vs GRV summary tab first', () => {
    expect(
      fixture.nativeElement.querySelector('pos-frontend-purchases-report-grv-vs-purchases-summary')
    ).toBeTruthy();
  });
});
