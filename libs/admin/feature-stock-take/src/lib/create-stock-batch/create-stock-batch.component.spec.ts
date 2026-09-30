import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type StockTakeBatch, StockTakeStore } from '@pos-frontend/stock-take/data-access';
import { of } from 'rxjs';

import { CloseBatchComponent } from '../close-batch/close-batch.component';
import { CreateStockBatchComponent } from './create-stock-batch.component';

describe('CreateStockBatchComponent', () => {
  let component: CreateStockBatchComponent;
  let fixture: ComponentFixture<CreateStockBatchComponent>;
  const stockTakeBatch = signal<StockTakeBatch | undefined>(undefined);
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const stockTakeStore = {
    stockTakeBatch,
    createLoading: () => false,
    createStockTakeBatch: jest.fn(),
  };
  const dialog = { open: jest.fn(() => ({ afterClosed: () => of(true) })) };

  beforeEach(async () => {
    jest.clearAllMocks();
    stockTakeBatch.set(undefined);
    await TestBed.configureTestingModule({
      imports: [CreateStockBatchComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: StockTakeStore, useValue: stockTakeStore },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStockBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load products', () => {
    expect(component).toBeTruthy();
    expect(productStore.getAllProducts).toHaveBeenCalled();
  });

  it('initiates a batch through the store', () => {
    (component as unknown as { initiateBatch: () => void }).initiateBatch();
    expect(stockTakeStore.createStockTakeBatch).toHaveBeenCalled();
  });

  it('confirms closing the open batch in a dialog and clears it afterwards', () => {
    stockTakeBatch.set({
      batchNumber: 4,
      createdBy: '',
      updatedBy: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    fixture.detectChanges();
    const internals = component as unknown as {
      batchNumber: () => number | null;
      closeBatch: (products: []) => void;
    };
    expect(internals.batchNumber()).toBe(4);

    internals.closeBatch([]);

    expect(dialog.open).toHaveBeenCalledWith(
      CloseBatchComponent,
      expect.objectContaining({ data: { batchNumber: 4, products: [] } })
    );
    expect(internals.batchNumber()).toBeNull();
  });
});
