import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { CreateCurrencyComponent } from './create-currency.component';

describe('CreateCurrencyComponent', () => {
  let component: CreateCurrencyComponent;
  let fixture: ComponentFixture<CreateCurrencyComponent>;
  const store = { createLoading: () => false, createCurrency: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCurrencyComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates a non-default currency from the form value', () => {
    const el: HTMLElement = fixture.nativeElement;
    const fill = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(id)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    fill('#currency-name', 'US Dollar');
    fill('#currency-code', 'USD');
    fill('#currency-symbol', '$');

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createCurrency).toHaveBeenCalledWith({
      data: { name: 'US Dollar', code: 'USD', symbol: '$', isDefault: false },
      callback: expect.any(Function),
    });
  });
});
