import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type StockTakeBatch, StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { CreateStockBatchComponent } from './create-stock-batch.component';

describe('CreateStockBatchComponent', () => {
  let component: CreateStockBatchComponent;
  let fixture: ComponentFixture<CreateStockBatchComponent>;
  const productStore = {
    products: () => [{ id: 1, code: 'SUG2', name: 'Sugar 2kg', quantity: 10 }],
    getAllProducts: jest.fn(),
  };
  const batch = signal<StockTakeBatch | undefined>(undefined);
  const openBatch: StockTakeBatch = {
    batchNumber: 4,
    createdBy: '',
    updatedBy: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const stockTakeStore = {
    stockTakeBatch: batch,
    createLoading: () => false,
    addProductsLoading: () => false,
    createStockTakeBatch: jest.fn(),
    addProductsToBatch: jest.fn(),
  };

  // Protected members exercised directly, the same way the template does.
  const internals = (): any => component;
  const buttonWithText = (text: string): HTMLButtonElement | undefined =>
    [...fixture.nativeElement.querySelectorAll('button')].find((b: HTMLButtonElement) =>
      b.textContent?.includes(text)
    );

  beforeEach(async () => {
    jest.clearAllMocks();
    batch.set(undefined);
    await TestBed.configureTestingModule({
      imports: [CreateStockBatchComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: StockTakeStore, useValue: stockTakeStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads products and initiates a batch through the store', () => {
    expect(productStore.getAllProducts).toHaveBeenCalled();
    buttonWithText('Initiate Stock Take')!.click();
    expect(stockTakeStore.createStockTakeBatch).toHaveBeenCalled();
  });

  it('confirms closing the batch in the page, then clears it', () => {
    batch.set(openBatch);
    fixture.detectChanges();
    internals().form.setValue({ code: 'SUG2', quantity: 7 });
    internals().saveProduct();
    fixture.detectChanges();

    buttonWithText('Close Batch')!.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('pos-frontend-inline-confirm')).toBeTruthy();
    expect(stockTakeStore.addProductsToBatch).not.toHaveBeenCalled();

    const confirm = fixture.nativeElement.querySelectorAll('pos-frontend-inline-confirm button')[1];
    confirm.click();
    expect(stockTakeStore.addProductsToBatch).toHaveBeenCalledWith({
      data: { batchNumber: 4, products: [{ id: 1, code: 'SUG2', productName: 'Sugar 2kg', quantity: 7 }] },
      callback: expect.any(Function),
    });

    stockTakeStore.addProductsToBatch.mock.calls[0][0].callback();
    expect(internals().batchNumber()).toBeNull();
    expect(internals().items()).toEqual([]);
  });

  it('rejects a product that is already on the batch', () => {
    batch.set(openBatch);
    fixture.detectChanges();
    internals().form.setValue({ code: 'SUG2', quantity: 7 });
    internals().saveProduct();
    internals().form.setValue({ code: 'SUG2', quantity: 3 });
    internals().saveProduct();

    expect(internals().items()).toHaveLength(1);
    expect(internals().errorMessage()).toBe('Product already exists on line 1');
  });
});
