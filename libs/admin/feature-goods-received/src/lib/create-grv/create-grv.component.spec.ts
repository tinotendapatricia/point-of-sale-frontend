import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  type PurchaseOrderReceivableLine,
  PurchaseOrderStore,
} from '@pos-frontend/purchase-orders/data-access';

import { CreateGrvComponent } from './create-grv.component';

describe('CreateGrvComponent', () => {
  let component: CreateGrvComponent;
  let fixture: ComponentFixture<CreateGrvComponent>;
  const lines = signal<PurchaseOrderReceivableLine[]>([]);
  const purchaseOrderStore = {
    purchaseOrderLines: lines,
    getOneLoading: () => false,
    receiveLoading: () => false,
    getPurchaseOrder: jest.fn(),
    receivePurchaseOrder: jest.fn(),
  };

  // Protected members driven directly, the same way the template does.
  const internals = (): any => component;
  const el = (): HTMLElement => fixture.nativeElement;
  const receiveButton = (): HTMLButtonElement => el().querySelector('.footer-card button')!;

  beforeEach(async () => {
    jest.clearAllMocks();
    lines.set([]);
    await TestBed.configureTestingModule({
      imports: [CreateGrvComponent],
      providers: [provideNoopAnimations(), { provide: PurchaseOrderStore, useValue: purchaseOrderStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads the purchase order lines by order number', () => {
    const input = el().querySelector<HTMLInputElement>('#grv-purchase-order')!;
    input.value = '42';
    input.dispatchEvent(new Event('input'));
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(purchaseOrderStore.getPurchaseOrder).toHaveBeenCalledWith({ id: 42 });
  });

  it('keeps Receive goods disabled until something is received', () => {
    lines.set([{ product: 1, name: 'Sugar', quantity: 10, amount: 20 }]);
    fixture.detectChanges();
    expect(receiveButton().disabled).toBe(true);

    const qty = el().querySelector<HTMLInputElement>('tbody .cell-input')!;
    qty.value = '4';
    qty.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(receiveButton().disabled).toBe(false);
  });

  it('receives only the lines with a quantity, with the same payload as before', () => {
    lines.set([
      { product: 1, name: 'Sugar', quantity: 10, amount: 20 },
      { product: 2, name: 'Salt', quantity: 5, amount: 5 },
    ]);
    fixture.detectChanges();
    internals().form.patchValue({ purchaseOrder: 12, reference: 'GRV-1' });
    internals().quantities.at(0).setValue(4);
    fixture.detectChanges();

    receiveButton().click();

    expect(purchaseOrderStore.receivePurchaseOrder).toHaveBeenCalledWith({
      data: {
        purchaseOrderNumber: 12,
        reference: 'GRV-1',
        totalAmount: 8,
        totalQty: 4,
        products: [
          { product: 1, name: 'Sugar', quantity: 10, amount: 20, qtyReceived: 4, unitCost: 2, receivedValue: 8 },
        ],
      },
      callback: expect.any(Function),
    });
  });

  it('shows an empty state before an order is loaded', () => {
    expect(el().textContent).toContain('Load a purchase order to see what can be received.');
  });
});
