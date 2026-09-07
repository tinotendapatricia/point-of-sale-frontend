import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { CreateCurrencyComponent } from './create-currency.component';

describe('CreateCurrencyComponent', () => {
  let component: CreateCurrencyComponent;
  let fixture: ComponentFixture<CreateCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateCurrencyComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CurrenciesFacade, useValue: { createNewCurrency: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
