import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { CreditorsEntity } from '@pos-frontend/creditors/data-access';
import type { ProductsEntity } from '@pos-frontend/products/data-access';

import { PurchaseOrderFormComponent } from './purchase-order-form.component';

const product: ProductsEntity = {
  id: 7,
  name: 'Sugar',
  code: 'SUG',
  barcode: '',
  active: true,
  price: [],
  cost: [{ value: 2, effectiveDate: new Date() }],
  taxable: 'Y',
  quantity: 10,
  reorderLevel: 1,
  mass: '1',
  measuredIn: 'kg',
  createdAt: '',
  updatedAt: '',
};

const creditor: CreditorsEntity = {
  id: 3,
  name: 'Acme',
  account: '',
  contact: '',
  address: '',
  createdAt: '',
  updatedAt: '',
};

/** Protected members the spec drives directly. */
interface FormInternals {
  form: { patchValue: (value: object) => void };
  lineForm: { patchValue: (value: object) => void };
  saveLine: () => void;
  submit: () => void;
}

describe('PurchaseOrderFormComponent', () => {
  let component: PurchaseOrderFormComponent;
  let fixture: ComponentFixture<PurchaseOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderFormComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', [product]);
    fixture.componentRef.setInput('creditors', [creditor]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the order with its product lines and totals', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    const internals = component as unknown as FormInternals;

    internals.form.patchValue({ creditor: 3, reference: 'REF' });
    internals.lineForm.patchValue({ code: 'SUG', name: 'Sugar', quantityPurchased: 5, cost: 2 });
    internals.saveLine();
    internals.submit();

    expect(emitted).toHaveBeenCalledWith({
      creditor: 3,
      reference: 'REF',
      totalAmount: 10,
      totalQty: 5,
      products: [
        {
          product: 7,
          code: 'SUG',
          description: 'Sugar',
          quantityPurchased: 5,
          quantity: 5,
          cost: 10,
          value: 10,
        },
      ],
    });
  });

  it('does not emit without a creditor', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    (component as unknown as FormInternals).submit();
    expect(emitted).not.toHaveBeenCalled();
  });
});
