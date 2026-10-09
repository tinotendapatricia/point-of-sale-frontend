import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { DebtorStore } from '@pos-frontend/debtors/data-access';
import { type CreateSaleRequest, PosStore } from '@pos-frontend/pos/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { RefundHomeComponent } from './refund-home.component';

describe('RefundHomeComponent', () => {
  let fixture: ComponentFixture<RefundHomeComponent>;
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const debtorStore = { debtors: () => [], getAllDebtors: jest.fn() };
  const currencyStore = {
    defaultCurrency: () => undefined,
    getDefaultCurrency: jest.fn(),
  };
  const posStore = {
    createLoading: () => false,
    pos: () => undefined,
    createPos: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [RefundHomeComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: DebtorStore, useValue: debtorStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: PosStore, useValue: posStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RefundHomeComponent);
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
      transactionType: 2,
      reference: '',
      changeDebtor: null,
      changeRate: null,
      changeAmount: null,
    };
    fixture.componentInstance['createSale'](sale);
    expect(posStore.createPos).toHaveBeenCalledWith({
      data: sale,
      callback: expect.any(Function),
    });
  });
});
