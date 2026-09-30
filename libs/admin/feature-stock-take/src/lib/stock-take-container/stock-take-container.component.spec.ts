import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { StockTakeStore } from '@pos-frontend/stock-take/data-access';

import { StockTakeContainerComponent } from './stock-take-container.component';

describe('StockTakeContainerComponent', () => {
  let component: StockTakeContainerComponent;
  let fixture: ComponentFixture<StockTakeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTakeContainerComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: { products: () => [], getAllProducts: jest.fn() } },
        {
          provide: StockTakeStore,
          useValue: {
            stockTakeBatch: () => undefined,
            createLoading: () => false,
            batchProducts: () => [],
            getBatchProductsLoading: () => false,
          },
        },
        { provide: MatDialog, useValue: { open: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
