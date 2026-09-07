import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { CurrenciesListComponent } from './currencies-list.component';

describe('CurrenciesListComponent', () => {
  let component: CurrenciesListComponent;
  let fixture: ComponentFixture<CurrenciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CurrenciesListComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: CurrenciesFacade,
        useValue: {
          allCurrencies$: of([]),
          totalCurrencies$: of(0),
          loading$: of(false),
          getPaginatedCurrencies: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CurrenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
