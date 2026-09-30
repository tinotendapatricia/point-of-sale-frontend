import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CreditorStore } from '@pos-frontend/creditors/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import {
  type CreatePurchaseOrderRequest,
  PurchaseOrderStore,
} from '@pos-frontend/purchase-orders/data-access';

import { CreatePurchaseOrderComponent } from './create-purchase-order.component';

describe('CreatePurchaseOrderComponent', () => {
  let component: CreatePurchaseOrderComponent;
  let fixture: ComponentFixture<CreatePurchaseOrderComponent>;
  const productStore = { products: () => [], getAllProducts: jest.fn() };
  const creditorStore = { creditors: () => [], getAllCreditors: jest.fn() };
  const purchaseOrderStore = {
    purchaseOrder: () => undefined,
    createLoading: () => false,
    createPurchaseOrder: jest.fn(),
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

  it('should create and load products and creditors', () => {
    expect(component).toBeTruthy();
    expect(productStore.getAllProducts).toHaveBeenCalled();
    expect(creditorStore.getAllCreditors).toHaveBeenCalled();
  });

  it('creates the purchase order through the store', () => {
    const order: CreatePurchaseOrderRequest = {
      creditor: 1,
      reference: '',
      totalAmount: 0,
      totalQty: 0,
      products: [],
    };
    (component as unknown as { create: (o: CreatePurchaseOrderRequest) => void }).create(order);
    expect(purchaseOrderStore.createPurchaseOrder).toHaveBeenCalledWith({
      data: order,
      callback: expect.any(Function),
    });
  });
});
