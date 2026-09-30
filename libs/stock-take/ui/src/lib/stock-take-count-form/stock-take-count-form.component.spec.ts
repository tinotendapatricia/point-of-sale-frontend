import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { ProductsEntity } from '@pos-frontend/products/data-access';
import type { StockTakeBatchProduct } from '@pos-frontend/stock-take/data-access';

import { StockTakeCountFormComponent } from './stock-take-count-form.component';

const product: ProductsEntity = {
  id: 5,
  name: 'Rice',
  code: 'RICE',
  barcode: '',
  active: true,
  price: [],
  cost: [],
  taxable: 'Y',
  quantity: 3,
  reorderLevel: 1,
  mass: '1',
  measuredIn: 'kg',
  createdAt: '',
  updatedAt: '',
};

/** Protected members the spec drives directly. */
interface FormInternals {
  form: { patchValue: (value: object) => void };
  startComparison: () => void;
  adjustStock: () => void;
}

describe('StockTakeCountFormComponent', () => {
  let component: StockTakeCountFormComponent;
  let fixture: ComponentFixture<StockTakeCountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTakeCountFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeCountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts a comparison and emits the adjustment for the compared batch', () => {
    const started = jest.fn();
    const adjusted = jest.fn();
    component.comparisonStarted.subscribe(started);
    component.adjusted.subscribe(adjusted);
    const internals = component as unknown as FormInternals;

    internals.form.patchValue({ batchNumber: 9 });
    internals.startComparison();
    expect(started).toHaveBeenCalledWith(9);

    const batchProducts: StockTakeBatchProduct[] = [{ productId: 5, quantity: 7, stockBatch: 9 }];
    fixture.componentRef.setInput('batchProducts', batchProducts);
    fixture.componentRef.setInput('products', [product]);
    fixture.detectChanges();
    internals.adjustStock();

    expect(adjusted).toHaveBeenCalledWith({
      batchNumber: 9,
      values: [{ product: 5, quantity: 7, adjustedOnBatch: 9 }],
      adjustedValues: [{ productId: 5, name: 'Rice', batchCount: 7, systemCount: 3, variance: 4 }],
    });
  });
});
