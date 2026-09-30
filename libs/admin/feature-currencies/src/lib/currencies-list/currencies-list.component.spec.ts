import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { CurrenciesListComponent } from './currencies-list.component';

describe('CurrenciesListComponent', () => {
  let component: CurrenciesListComponent;
  let fixture: ComponentFixture<CurrenciesListComponent>;
  const store = {
    paginatedCurrencies: () => [],
    totalCurrencies: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedCurrencies: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesListComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedCurrencies).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
