import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';
import {
  type BreakProductRequest,
  type CreateProductRequest,
  type ProductFilters,
  type ProductsEntity,
  type UpdateCostRequest,
  type UpdatePriceRequest,
} from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiService = inject(ApiService);

  getPaginatedProducts(filters?: ProductFilters) {
    return this.apiService.get<Page<ProductsEntity>>(
      `/products/paginated`,
      toHttpParams(filters)
    );
  }

  createProduct(productDetails: CreateProductRequest) {
    return this.apiService.post<ProductsEntity>(
      `/products/create/`,
      productDetails
    );
  }

  breakProduct(details: BreakProductRequest) {
    return this.apiService.put<ProductsEntity>(`/products/break`, details);
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

  updateCost(details: UpdateCostRequest) {
    return this.apiService.post<ProductsEntity>(
      `/costs/update-cost/${details.id}`,
      details
    );
  }

  updatePrice(details: UpdatePriceRequest) {
    return this.apiService.post<ProductsEntity>(
      `/prices/update-price/${details.id}`,
      details
    );
  }

  deleteProduct(productId: string | number) {
    return this.apiService.delete<void>(`/products/${productId}`);
  }

  getAllProducts() {
    return this.apiService.get<ProductsEntity[]>(`/products/all`);
  }
}
