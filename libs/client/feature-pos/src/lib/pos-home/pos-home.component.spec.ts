import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { of } from 'rxjs';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { type CreateSaleRequest, PosFacade } from '@pos-frontend/pos/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { PosHomeComponent } from './pos-home.component';

describe('PosHomeComponent', () => {
  let fixture: ComponentFixture<PosHomeComponent>;
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const debtorStore = { debtors: () => [], getAllDebtors: jest.fn() };
  const currencyStore = {
    defaultCurrency: () => undefined,
    getDefaultCurrency: jest.fn(),
  };
  const posFacade = {
    btnState$: of(ClrLoadingState.DEFAULT),
    selectedPos$: of(undefined),
    createNewPos: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [PosHomeComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: DebtorStore, useValue: debtorStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: PosFacade, useValue: posFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PosHomeComponent);
    fixture.detectChanges();
  });

  it('loads the till data on entry', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(productStore.getAllProducts).toHaveBeenCalled();
    expect(debtorStore.getAllDebtors).toHaveBeenCalled();
    expect(currencyStore.getDefaultCurrency).toHaveBeenCalled();
  });

  it('creates the sale emitted by the form', () => {
    const sale: CreateSaleRequest = {
      products: [],
      totalAmountExcVat: 1,
      totalVat: 0,
      total: 1,
      debtor: 1,
      station: '1',
      rate: 1,
      transactionType: 1,
      reference: '',
      changeDebtor: null,
      changeRate: null,
      changeAmount: null,
    };
    fixture.componentInstance['createSale'](sale);
    expect(posFacade.createNewPos).toHaveBeenCalledWith(sale);
  });
});
