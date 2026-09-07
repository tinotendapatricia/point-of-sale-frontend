import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { UpdateCurrencyComponent } from './update-currency.component';

describe('UpdateCurrencyComponent', () => {
  let component: UpdateCurrencyComponent;
  let fixture: ComponentFixture<UpdateCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCurrencyComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CurrenciesFacade, useValue: { updateCurrency: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { currency: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
