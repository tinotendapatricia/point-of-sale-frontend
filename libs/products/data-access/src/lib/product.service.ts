import { Injectable } from '@angular/core';
import { ProductsEntity } from './product.model';
import { ApiService, Page } from '@pos-frontend/shared/data-access';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getPaginatedProducts(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<ProductsEntity>>(
      `/products/paginated`,
      httpParams
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

  updateCost(productDetails: any) {
    return this.apiService.post<ProductsEntity>(
      `/costs/update-cost/${productDetails.id}`,productDetails
    );
  }

  updatePrice(productDetails: any) {
    return this.apiService.post<ProductsEntity>(
      `/prices/update-price/${productDetails.id}`,productDetails
    );
  }

  deleteProduct(productId: string | number) {
    return this.apiService.delete(`/products/${productId}`);
  }

  getAllProducts() {
    return this.apiService.get<ProductsEntity[]>(`/products/all`);
  }
}
