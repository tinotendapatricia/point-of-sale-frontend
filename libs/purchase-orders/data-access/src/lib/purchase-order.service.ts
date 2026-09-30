import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';

import {
  type AssignPurchaseOrderRolesRequest,
  type CreatePurchaseOrderRequest,
  type PurchaseOrderEntity,
  type PurchaseOrderFilters,
  type PurchaseOrderReceivableLine,
  type ReceivePurchaseOrderRequest,
} from './purchase-order.model';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  private readonly apiService = inject(ApiService);

  getPaginatedPurchaseOrders(filters?: PurchaseOrderFilters) {
    return this.apiService.get<Page<PurchaseOrderEntity>>(
      `/purchase-orders/paginated`,
      toHttpParams(filters)
    );
  }

  createPurchaseOrder(details: CreatePurchaseOrderRequest) {
    return this.apiService.post<PurchaseOrderEntity>(
      `/purchase-orders/create`,
      details
    );
  }

  /** Goods received against a purchase order. */
  receivePurchaseOrder(details: ReceivePurchaseOrderRequest) {
    return this.apiService.put<PurchaseOrderEntity>(
      `/receive/products`,
      details
    );
  }

  assignPurchaseOrderRoles(details: AssignPurchaseOrderRolesRequest) {
    return this.apiService.put<PurchaseOrderEntity>(
      `/purchaseOrder/assign-roles/${details.creditorId}`,
      details
    );
  }

  /** Looks a purchase order up by its order number and returns its lines. */
  getPurchaseOrder(orderNumber: string | number) {
    return this.apiService.get<PurchaseOrderReceivableLine[]>(
      `/purchase-orders/${orderNumber}`
    );
  }

  deletePurchaseOrder(id: string | number) {
    return this.apiService.delete<void>(`/purchaseOrder/${id}`);
  }

  getAllPurchaseOrders() {
    return this.apiService.get<PurchaseOrderEntity[]>(`/purchaseOrder/all`);
  }
}
