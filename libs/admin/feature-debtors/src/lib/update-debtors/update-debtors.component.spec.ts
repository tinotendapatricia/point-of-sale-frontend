import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { DebtorsFacade } from '@pos-frontend/debtors/data-access';
import { UpdateDebtorsComponent } from './update-debtors.component';

describe('UpdateDebtorsComponent', () => {
  let component: UpdateDebtorsComponent;
  let fixture: ComponentFixture<UpdateDebtorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateDebtorsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: DebtorsFacade, useValue: { updateDebtor: () => undefined, loaded$: of(false) } },
      { provide: CurrenciesFacade, useValue: { getAllCurrencies: () => undefined, allCurrencies$: of([]) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { debtor: { currency: {} } } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
