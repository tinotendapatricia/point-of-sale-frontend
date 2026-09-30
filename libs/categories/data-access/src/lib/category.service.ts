import { Injectable, inject } from '@angular/core';
import {
  ApiService,
  type Page,
  toHttpParams,
} from '@pos-frontend/shared/data-access';
import {
  type AssignCategoryRolesRequest,
  type CategoryEntity,
  type CategoryFilters,
  type CreateCategoryRequest,
} from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiService = inject(ApiService);

  getPaginatedCategories(filters?: CategoryFilters) {
    return this.apiService.get<Page<CategoryEntity>>(
      `/categories/list`,
      toHttpParams(filters)
    );
  }

  createCategory(categoryDetails: CreateCategoryRequest) {
    return this.apiService.post<CategoryEntity>(
      `/categories/create`,
      categoryDetails
    );
  }

  assignCategoryRoles(details: AssignCategoryRolesRequest) {
    return this.apiService.put<CategoryEntity>(
      `/categories/assign-roles/${details.categoryId}`,
      details
    );
  }

  getCategory(categoryId: string | number) {
    return this.apiService.get<CategoryEntity>(`/categories/${categoryId}`);
  }

  updateCategory(categoryDetails: CategoryEntity) {
    return this.apiService.put<CategoryEntity>(
      `/categories/rupdate/${categoryDetails.id}`,
      categoryDetails
    );
  }

  deleteCategory(categoryId: string | number) {
    return this.apiService.delete<void>(`/categories/${categoryId}`);
  }

  getAllCategories() {
    return this.apiService.get<CategoryEntity[]>(`/categories/all`);
  }
}
