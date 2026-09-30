import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { UpdateCurrencyComponent } from './update-currency.component';

describe('UpdateCurrencyComponent', () => {
  let component: UpdateCurrencyComponent;
  let fixture: ComponentFixture<UpdateCurrencyComponent>;
  const store = {
    currency: () => undefined,
    getOneLoading: () => false,
    updateLoading: () => false,
    getCurrency: jest.fn(),
    updateCurrency: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCurrencyComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ currencyId: '7' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the currency from the route id', () => {
    expect(store.getCurrency).toHaveBeenCalledWith({ id: '7' });
  });
});
