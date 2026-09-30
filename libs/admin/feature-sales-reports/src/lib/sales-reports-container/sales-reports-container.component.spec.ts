import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';

import { SalesReportsContainerComponent } from './sales-reports-container.component';

describe('SalesReportsContainerComponent', () => {
  let component: SalesReportsContainerComponent;
  let fixture: ComponentFixture<SalesReportsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesReportsContainerComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: ReportStore,
          useValue: { salesLoading: () => false, cashupLoading: () => false },
        },
        { provide: ProductStore, useValue: { products: () => [], getAllProducts: jest.fn() } },
        { provide: DebtorStore, useValue: { debtors: () => [], getAllDebtors: jest.fn() } },
        {
          provide: CurrencyStore,
          useValue: { currencies: () => [], getAllCurrencies: jest.fn() },
        },
        {
          provide: ConfigurationStore,
          useValue: { pendingCashups: () => [], getPendingCashups: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the sales summary tab first', () => {
    expect(fixture.nativeElement.querySelector('pos-frontend-all-sales-reports')).toBeTruthy();
  });
});
