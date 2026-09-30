import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { ReportStore } from '@pos-frontend/reports/data-access';
import { CashupFormComponent } from '@pos-frontend/reports/ui';

import { TillCashupReportComponent } from './till-cashup-report.component';

describe('TillCashupReportComponent', () => {
  let component: TillCashupReportComponent;
  let fixture: ComponentFixture<TillCashupReportComponent>;
  const reportStore = { cashupLoading: () => false, generateCashup: jest.fn() };
  const currencyStore = { currencies: () => [], getAllCurrencies: jest.fn() };
  const configurationStore = { pendingCashups: () => [], getPendingCashups: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [TillCashupReportComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ReportStore, useValue: reportStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: ConfigurationStore, useValue: configurationStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TillCashupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load currencies and pending tills', () => {
    expect(component).toBeTruthy();
    expect(currencyStore.getAllCurrencies).toHaveBeenCalled();
    expect(configurationStore.getPendingCashups).toHaveBeenCalled();
  });

  it('generates the cash-up the form submits', () => {
    const form: CashupFormComponent = fixture.debugElement.query(
      By.directive(CashupFormComponent)
    ).componentInstance;
    const cashup = { cashup: [{ code: 'USD', total: 10 }], station: 'T1', tDate: '2024-01-01' };
    form.submitted.emit(cashup);
    expect(reportStore.generateCashup).toHaveBeenCalledWith(cashup);
  });
});
