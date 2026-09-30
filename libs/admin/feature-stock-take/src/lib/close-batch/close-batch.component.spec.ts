import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { CloseBatchComponent } from './close-batch.component';

describe('CloseBatchComponent', () => {
  let component: CloseBatchComponent;
  let fixture: ComponentFixture<CloseBatchComponent>;
  const dialogRef = { close: jest.fn() };
  const batch = { batchNumber: 3, products: [] };
  const stockTakeStore = {
    addProductsLoading: () => false,
    addProductsToBatch: jest.fn(({ callback }: { callback: () => void }) => callback()),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CloseBatchComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: batch },
        { provide: StockTakeStore, useValue: stockTakeStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CloseBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds the products to the batch and closes on success', () => {
    (component as unknown as { closeBatch: () => void }).closeBatch();
    expect(stockTakeStore.addProductsToBatch).toHaveBeenCalledWith({
      data: batch,
      callback: expect.any(Function),
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
