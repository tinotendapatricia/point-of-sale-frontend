import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';
import { type ProductsEntity, ProductStore } from '@pos-frontend/products/data-access';
import { PurchaseOrderStore } from '@pos-frontend/purchase-orders/data-access';

import { CreatePurchaseOrderComponent } from './create-purchase-order.component';

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

describe('CreatePurchaseOrderComponent', () => {
  let component: CreatePurchaseOrderComponent;
  let fixture: ComponentFixture<CreatePurchaseOrderComponent>;
  const productStore = { products: () => [product], getAllProducts: jest.fn() };
  const creditorStore = { creditors: () => [creditor], getAllCreditors: jest.fn() };
  const purchaseOrderStore = {
    purchaseOrder: () => undefined,
    createLoading: () => false,
    createPurchaseOrder: jest.fn(),
  };

  // Protected members driven directly, the same way the template does.
  const internals = (): any => component;
  const el = (): HTMLElement => fixture.nativeElement;

  const addSugar = (quantity: number): void => {
    internals().itemForm.controls.code.setValue('SUG');
    internals().productSelected();
    internals().itemForm.controls.quantity.setValue(quantity);
    internals().addItem();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreatePurchaseOrderComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: productStore },
        { provide: CreditorStore, useValue: creditorStore },
        { provide: PurchaseOrderStore, useValue: purchaseOrderStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads products and creditors', () => {
    expect(productStore.getAllProducts).toHaveBeenCalled();
    expect(creditorStore.getAllCreditors).toHaveBeenCalled();
  });

  it('pre-fills the unit cost and shows the line total before adding', () => {
    internals().itemForm.controls.code.setValue('SUG');
    internals().productSelected();
    internals().itemForm.controls.quantity.setValue(5);
    expect(internals().itemForm.controls.unitCost.value).toBe(2);
    expect(internals().entryTotal()).toBe(10);
  });

  it('creates the order with the same payload as before', () => {
    internals().form.patchValue({ creditor: 3, reference: 'REF' });
    addSugar(5);

    el().querySelector<HTMLButtonElement>('.footer-card button[mat-flat-button]')!.click();

    expect(purchaseOrderStore.createPurchaseOrder).toHaveBeenCalledWith({
      data: {
        creditor: 3,
        reference: 'REF',
        totalAmount: 10,
        totalQty: 5,
        products: [
          { product: 7, code: 'SUG', description: 'Sugar', quantityPurchased: 5, quantity: 5, cost: 10, value: 10 },
        ],
      },
      callback: expect.any(Function),
    });

    purchaseOrderStore.createPurchaseOrder.mock.calls[0][0].callback();
    expect(internals().items.length).toBe(0);
    expect(internals().form.controls.creditor.value).toBeNull();
  });

  it('updates totals when a quantity is edited in the table', () => {
    addSugar(5);
    const quantity = el().querySelector<HTMLInputElement>('tbody .cell-input')!;
    quantity.value = '8';
    quantity.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(internals().totalQuantity()).toBe(8);
    expect(internals().totalAmount()).toBe(16);
  });

  it('rejects a product that is already on the order', () => {
    addSugar(5);
    addSugar(2);
    expect(internals().items.length).toBe(1);
    expect(internals().itemError()).toBe('Product already added');
  });

  it('needs a supplier and at least one item', () => {
    internals().submit();
    expect(purchaseOrderStore.createPurchaseOrder).not.toHaveBeenCalled();

    internals().form.patchValue({ creditor: 3 });
    internals().submit();
    expect(purchaseOrderStore.createPurchaseOrder).not.toHaveBeenCalled();
    expect(internals().itemError()).toBe('Add at least one product');
  });
});
