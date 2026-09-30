import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';
import { type AdjustStockRequest, StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { StockAdjustmentComponent } from './stock-adjustment.component';

describe('StockAdjustmentComponent', () => {
  let component: StockAdjustmentComponent;
  let fixture: ComponentFixture<StockAdjustmentComponent>;
  const dialogRef = { close: jest.fn() };
  const adjustment: AdjustStockRequest = { batchNumber: 3, values: [], adjustedValues: [] };
  const stockTakeStore = {
    adjustLoading: () => false,
    adjustStock: jest.fn(({ callback }: { callback: () => void }) => callback()),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [StockAdjustmentComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: adjustment },
        { provide: StockTakeStore, useValue: stockTakeStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adjusts the stock, closes and returns to the dashboard', () => {
    const navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    (component as unknown as { adjustStock: () => void }).adjustStock();
    expect(stockTakeStore.adjustStock).toHaveBeenCalledWith({
      data: adjustment,
      callback: expect.any(Function),
    });
    expect(dialogRef.close).toHaveBeenCalledWith(true);
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
