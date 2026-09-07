import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { CreateDebtorsComponent } from './create-debtors.component';

describe('CreateDebtorsComponent', () => {
  let component: CreateDebtorsComponent;
  let fixture: ComponentFixture<CreateDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateDebtorsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: DebtorsFacade, useValue: { createNewDebtor: () => undefined, loaded$: of(false) } },
      { provide: CurrenciesFacade, useValue: { getAllCurrencies: () => undefined, allCurrencies$: of([]) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
