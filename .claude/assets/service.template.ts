// Reference service (<singular>.service.ts). Match this structure, member order, and formatting.
import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService, type Page } from '@pos-frontend/shared/data-access';
import type {
  ProductFilters,
  ProductsEntity,
  UpdateCostRequest,
  UpdatePriceRequest,
} from './product.model';

/** Drops null/undefined so typed optional filters can become HttpParams. */
function toParams(filters: object = {}): HttpParams {
  const clean = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Record<string, string | number | boolean>;
  return new HttpParams({ fromObject: clean });
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiService = inject(ApiService);

  getPaginatedProducts(filters?: ProductFilters) {
    return this.apiService.get<Page<ProductsEntity>>(
      `/products/paginated`,
      toParams(filters)
    );
  }

  createProduct(productDetails: ProductsEntity) {
    return this.apiService.post<ProductsEntity>(
      `/products/create/`,
      productDetails
    );
  }

  breakProduct(productDetails: ProductsEntity) {
    return this.apiService.put<ProductsEntity>(
      `/products/break`,
      productDetails
    );
  }

  getProduct(productId: string | number) {
    return this.apiService.get<ProductsEntity>(`/products/${productId}`);
  }

  updateProduct(productDetails: ProductsEntity) {
    return this.apiService.put<ProductsEntity>(
      `/products/update/${productDetails.id}`,
      productDetails
    );
  }

  updateCost(costDetails: UpdateCostRequest) {
    return this.apiService.post<ProductsEntity>(
      `/costs/update-cost/${costDetails.id}`,
      costDetails
    );
  }

  updatePrice(priceDetails: UpdatePriceRequest) {
    return this.apiService.post<ProductsEntity>(
      `/prices/update-price/${priceDetails.id}`,
      priceDetails
    );
  }

  deleteProduct(productId: string | number) {
    return this.apiService.delete(`/products/${productId}`);
  }

  getAllProducts() {
    return this.apiService.get<ProductsEntity[]>(`/products/all`);
  }
}
