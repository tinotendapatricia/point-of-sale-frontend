import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import {
  type CreatePurchaseOrderRequest,
  type ReceivePurchaseOrderRequest,
} from './purchase-order.model';
import { PurchaseOrderService } from './purchase-order.service';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of(null)),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(PurchaseOrderService);
  });

  it('gets paginated purchase orders with page/size params', () => {
    service.getPaginatedPurchaseOrders({ page: 0, size: 10 }).subscribe();
    const [path, params] = api.get.mock.calls[0] as unknown as [string, { get: (k: string) => string }];
    expect(path).toBe('/purchase-orders/paginated');
    expect(params.get('page')).toBe('0');
    expect(params.get('size')).toBe('10');
  });

  it('creates a purchase order', () => {
    const request = { creditor: 1, products: [] } as unknown as CreatePurchaseOrderRequest;
    service.createPurchaseOrder(request).subscribe();
    expect(api.post).toHaveBeenCalledWith('/purchase-orders/create', request);
  });

  it('receives a purchase order', () => {
    const request = { purchaseOrderNumber: 5, products: [] } as unknown as ReceivePurchaseOrderRequest;
    service.receivePurchaseOrder(request).subscribe();
    expect(api.put).toHaveBeenCalledWith('/receive/products', request);
  });

  it('assigns purchase order roles', () => {
    const request = { creditorId: 3 };
    service.assignPurchaseOrderRoles(request).subscribe();
    expect(api.put).toHaveBeenCalledWith('/purchaseOrder/assign-roles/3', request);
  });

  it('gets a purchase order by order number', () => {
    service.getPurchaseOrder('PO-1').subscribe();
    expect(api.get).toHaveBeenCalledWith('/purchase-orders/PO-1');
  });

  it('deletes a purchase order', () => {
    service.deletePurchaseOrder(9).subscribe();
    expect(api.delete).toHaveBeenCalledWith('/purchaseOrder/9');
  });

  it('gets all purchase orders', () => {
    service.getAllPurchaseOrders().subscribe();
    expect(api.get).toHaveBeenCalledWith('/purchaseOrder/all');
  });
});
