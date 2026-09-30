import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { PurchaseOrderReceivableLine } from '@pos-frontend/purchase-orders/data-access';

import { GrvFormComponent } from './grv-form.component';

/** Protected members the spec drives directly. */
interface FormInternals {
  form: { patchValue: (value: object) => void };
  quantities: { at: (index: number) => { setValue: (value: number) => void } };
  requestOrder: () => void;
  submit: () => void;
}

describe('GrvFormComponent', () => {
  let component: GrvFormComponent;
  let fixture: ComponentFixture<GrvFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrvFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(GrvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requests the purchase order by number', () => {
    const requested = jest.fn();
    component.orderRequested.subscribe(requested);
    const internals = component as unknown as FormInternals;
    internals.form.patchValue({ purchaseOrder: 12 });
    internals.requestOrder();
    expect(requested).toHaveBeenCalledWith(12);
  });

  it('emits the received lines with totals', () => {
    const lines: PurchaseOrderReceivableLine[] = [
      { product: 1, name: 'Sugar', quantity: 10, amount: 20 },
      { product: 2, name: 'Salt', quantity: 5, amount: 5 },
    ];
    fixture.componentRef.setInput('lines', lines);
    fixture.detectChanges();

    const submitted = jest.fn();
    component.submitted.subscribe(submitted);
    const internals = component as unknown as FormInternals;
    internals.form.patchValue({ purchaseOrder: 12, reference: 'GRV-1' });
    internals.quantities.at(0).setValue(4);
    internals.submit();

    expect(submitted).toHaveBeenCalledWith({
      purchaseOrderNumber: 12,
      reference: 'GRV-1',
      totalAmount: 8,
      totalQty: 4,
      products: [
        { product: 1, name: 'Sugar', quantity: 10, amount: 20, qtyReceived: 4, unitCost: 2, receivedValue: 8 },
      ],
    });
  });
});
