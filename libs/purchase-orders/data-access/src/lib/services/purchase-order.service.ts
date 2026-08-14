import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { PurchaseOrderEntity } from '../+state/purchase-order.models';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderService {
  constructor(private apiService: ApiService) {}

  getPaginatedPurchaseOrder(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<PurchaseOrderEntity>>(
      `/purchase-orders/paginated`,
      httpParams
    );
  }

  createPurchaseOrder(creditorDetails: PurchaseOrderEntity) {
    return this.apiService.post<PurchaseOrderEntity>(
      `/purchase-orders/create`,
      creditorDetails
    );
  }

  getPurchaseOrder(orderNumber: string | number) {
    return this.apiService.get<PurchaseOrderEntity>(
      `/purchase-orders/${orderNumber}`
    );
  }

  updatePurchaseOrder(creditorDetails: PurchaseOrderEntity) {
    return this.apiService.put<PurchaseOrderEntity>(
      `/receive/products`,
      creditorDetails
    );
  }

  assignPurchaseOrderRoles(creditorDetails: any) {
    return this.apiService.put<PurchaseOrderEntity>(
      `/purchaseOrder/assign-roles/${creditorDetails.creditorId}`,
      creditorDetails
    );
  }

  deletePurchaseOrder(creditorId: string | number) {
    return this.apiService.delete(`/purchaseOrder/${creditorId}`);
  }

  getAllPurchaseOrder() {
    return this.apiService.get<PurchaseOrderEntity[]>(`/purchaseOrder/all`);
  }
}
