import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  PurchaseOrderStore,
  type ReceivePurchaseOrderRequest,
} from '@pos-frontend/purchase-orders/data-access';

import { CreateGrvComponent } from './create-grv.component';

/** Protected handlers the spec drives directly. */
interface ContainerInternals {
  getPurchaseOrder: (orderNumber: number) => void;
  receive: (request: ReceivePurchaseOrderRequest) => void;
}

describe('CreateGrvComponent', () => {
  let component: CreateGrvComponent;
  let fixture: ComponentFixture<CreateGrvComponent>;
  const purchaseOrderStore = {
    purchaseOrderLines: () => [],
    getOneLoading: () => false,
    receiveLoading: () => false,
    getPurchaseOrder: jest.fn(),
    receivePurchaseOrder: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateGrvComponent],
      providers: [
        provideNoopAnimations(),
        { provide: PurchaseOrderStore, useValue: purchaseOrderStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the purchase order lines by order number', () => {
    (component as unknown as ContainerInternals).getPurchaseOrder(42);
    expect(purchaseOrderStore.getPurchaseOrder).toHaveBeenCalledWith({ id: 42 });
  });

  it('receives the goods through the store', () => {
    const request: ReceivePurchaseOrderRequest = {
      purchaseOrderNumber: 42,
      reference: '',
      totalAmount: 0,
      totalQty: 0,
      products: [],
    };
    (component as unknown as ContainerInternals).receive(request);
    expect(purchaseOrderStore.receivePurchaseOrder).toHaveBeenCalledWith({
      data: request,
      callback: expect.any(Function),
    });
  });
});
