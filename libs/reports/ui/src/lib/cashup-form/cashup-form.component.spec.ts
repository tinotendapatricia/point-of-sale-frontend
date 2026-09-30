import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';

import { CashupFormComponent } from './cashup-form.component';

describe('CashupFormComponent', () => {
  let component: CashupFormComponent;
  let fixture: ComponentFixture<CashupFormComponent>;

  const usd: CurrencyEntity = {
    id: 1,
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    rate: 1,
    isDefault: true,
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashupFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CashupFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currencies', [usd]);
    fixture.componentRef.setInput('tills', [{ station: 'T1', tDate: '2024-01-01' }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a cash and card amount per currency', () => {
    expect(fixture.nativeElement.querySelectorAll('input[type=number]').length).toBe(2);
  });

  it('does not emit until a till is selected', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the previous cash-up station and date', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=button]').click();
    fixture.detectChanges();

    const station: HTMLInputElement = fixture.nativeElement.querySelector('#cashup-previous-station');
    const date: HTMLInputElement = fixture.nativeElement.querySelector('#cashup-previous-date');
    station.value = 'T2';
    station.dispatchEvent(new Event('input'));
    date.value = '2024-02-01';
    date.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).toHaveBeenCalledWith({ cashup: [], station: 'T2', tDate: '2024-02-01' });
  });
});
