import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';

import { UpdateDebtorsComponent } from './update-debtors.component';

describe('UpdateDebtorsComponent', () => {
  let component: UpdateDebtorsComponent;
  let fixture: ComponentFixture<UpdateDebtorsComponent>;
  const debtorStore = { updateLoading: () => false, updateDebtor: jest.fn() };
  const currencyStore = { currencies: () => [], getAllCurrencies: jest.fn() };
  const drawerRef = { close: jest.fn() };
  const debtor: DebtorsEntity = {
    id: 9,
    name: 'Acme',
    account: 'ACC9',
    discount: 10,
    currency: { id: 2, name: 'ZWG', rate: [] },
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UpdateDebtorsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: DebtorStore, useValue: debtorStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: DrawerRef, useValue: drawerRef },
        { provide: DRAWER_DATA, useValue: { debtor } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDebtorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the debtor with its id and closes the drawer on success', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(debtorStore.updateDebtor).toHaveBeenCalledWith({
      data: { id: 9, name: 'Acme', account: 'ACC9', currency: 2, discount: 10 },
      callback: expect.any(Function),
    });
    debtorStore.updateDebtor.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
