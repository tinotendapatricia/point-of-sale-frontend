import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

import { StockTakeFormComponent } from './stock-take-form.component';

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
  errorMessage: () => string;
  saveProduct: () => void;
  submit: () => void;
}

describe('StockTakeFormComponent', () => {
  let component: StockTakeFormComponent;
  let fixture: ComponentFixture<StockTakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTakeFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(StockTakeFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', [product]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the counted products', () => {
    const submitted = jest.fn();
    component.submitted.subscribe(submitted);
    const internals = component as unknown as FormInternals;

    internals.form.patchValue({ code: 'RICE', quantity: 4 });
    internals.saveProduct();
    internals.submit();

    expect(submitted).toHaveBeenCalledWith([
      { id: 5, code: 'RICE', productName: 'Rice', quantity: 4 },
    ]);
  });

  it('rejects a product that is already on the batch', () => {
    const internals = component as unknown as FormInternals;
    internals.form.patchValue({ code: 'RICE', quantity: 4 });
    internals.saveProduct();
    internals.form.patchValue({ code: 'RICE', quantity: 1 });
    internals.saveProduct();
    expect(internals.errorMessage()).toBe('Product already exists on line 1');
  });
});
