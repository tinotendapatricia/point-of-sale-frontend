import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type StockTakeBatchProduct, StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { StockTakeComponent } from './stock-take.component';

describe('StockTakeComponent', () => {
  let fixture: ComponentFixture<StockTakeComponent>;
  const productStore = {
    products: () => [{ id: 1, name: 'Sugar 2kg', quantity: 10 }],
    getAllProducts: jest.fn(),
  };
  const batchProducts = signal<StockTakeBatchProduct[]>([]);
  const stockTakeStore = {
    batchProducts,
    getBatchProductsLoading: () => false,
    adjustLoading: () => false,
    getBatchProducts: jest.fn(),
    adjustStock: jest.fn(),
  };
  const router = { navigate: jest.fn() };

  const el = (): HTMLElement => fixture.nativeElement;
  const buttonWithText = (text: string): HTMLButtonElement | undefined =>
    [...el().querySelectorAll('button')].find((b) => b.textContent?.includes(text));

  const compareBatch = (batchNumber: string): void => {
    const input = el().querySelector<HTMLInputElement>('#stock-count-batch')!;
    input.value = batchNumber;
    input.dispatchEvent(new Event('input'));
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    batchProducts.set([{ productId: 1, quantity: 7, stockBatch: Number(batchNumber) }]);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    batchProducts.set([]);
    await TestBed.configureTestingModule({
      imports: [StockTakeComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: StockTakeStore, useValue: stockTakeStore },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeComponent);
    fixture.detectChanges();
  });

  it('loads the batch products and refreshes system stock', () => {
    compareBatch('8');
    expect(stockTakeStore.getBatchProducts).toHaveBeenCalledWith({ batchNumber: 8 });
    expect(productStore.getAllProducts).toHaveBeenCalled();
    expect(el().textContent).toContain('Sugar 2kg');
  });

  it('confirms the adjustment in the page, then returns to the dashboard', () => {
    compareBatch('8');

    buttonWithText('Adjust Stock')!.click();
    fixture.detectChanges();
    expect(stockTakeStore.adjustStock).not.toHaveBeenCalled();

    el().querySelectorAll<HTMLButtonElement>('pos-frontend-inline-confirm button')[1].click();
    expect(stockTakeStore.adjustStock).toHaveBeenCalledWith({
      data: {
        batchNumber: 8,
        values: [{ product: 1, quantity: 7, adjustedOnBatch: 8 }],
        adjustedValues: [{ productId: 1, name: 'Sugar 2kg', batchCount: 7, systemCount: 10, variance: -3 }],
      },
      callback: expect.any(Function),
    });

    stockTakeStore.adjustStock.mock.calls[0][0].callback();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
