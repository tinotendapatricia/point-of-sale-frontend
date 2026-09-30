import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';

import { CreateDebtorsComponent } from './create-debtors.component';

describe('CreateDebtorsComponent', () => {
  let component: CreateDebtorsComponent;
  let fixture: ComponentFixture<CreateDebtorsComponent>;
  const debtorStore = { createLoading: () => false, createDebtor: jest.fn() };
  const currencyStore = { currencies: () => [], getAllCurrencies: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateDebtorsComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: DebtorStore, useValue: debtorStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the currencies for the select', () => {
    expect(currencyStore.getAllCurrencies).toHaveBeenCalled();
  });

  it('closes the drawer without a result on cancel', () => {
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(drawerRef.close).toHaveBeenCalledWith(false);
    expect(debtorStore.createDebtor).not.toHaveBeenCalled();
  });
});
