import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { type AdjustStockRequest, StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { StockAdjustmentComponent } from '../stock-adjustment/stock-adjustment.component';
import { StockTakeComponent } from './stock-take.component';

/** Protected handlers the spec drives directly. */
interface ContainerInternals {
  compare: (batchNumber: number) => void;
  adjustStock: (adjustment: AdjustStockRequest) => void;
}

describe('StockTakeComponent', () => {
  let component: StockTakeComponent;
  let fixture: ComponentFixture<StockTakeComponent>;
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const stockTakeStore = {
    batchProducts: () => [],
    getBatchProductsLoading: () => false,
    getBatchProducts: jest.fn(),
  };
  const dialog = { open: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [StockTakeComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: StockTakeStore, useValue: stockTakeStore },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the batch products and refreshes system stock', () => {
    (component as unknown as ContainerInternals).compare(8);
    expect(stockTakeStore.getBatchProducts).toHaveBeenCalledWith({ batchNumber: 8 });
    expect(productStore.getAllProducts).toHaveBeenCalled();
  });

  it('opens the adjustment confirmation', () => {
    const adjustment: AdjustStockRequest = { batchNumber: 8, values: [], adjustedValues: [] };
    (component as unknown as ContainerInternals).adjustStock(adjustment);
    expect(dialog.open).toHaveBeenCalledWith(
      StockAdjustmentComponent,
      expect.objectContaining({ data: adjustment })
    );
  });
});
