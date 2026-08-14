import { Injectable } from '@angular/core';
import { CategoriesEntity } from '../+state/categories.models';
import { HttpParams } from '@angular/common/http';
import { ApiService, Page } from '@pos-frontend/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private apiService: ApiService) {}

  getPaginatedCategories(filters?: any) {
    const httpParams = new HttpParams({ fromObject: filters });
    return this.apiService.get<Page<CategoriesEntity>>(`/categories/list`, httpParams);
  }

  createCategorie(categorieDetails: CategoriesEntity) {
    return this.apiService.post<CategoriesEntity>(`/categories/create`, categorieDetails);
  }

  getCategorie(categorieId: string | number) {
    return this.apiService.get<CategoriesEntity>(`/categories/${categorieId}`);
  }

  updateCategorie(categorieDetails: CategoriesEntity) {
    return this.apiService.put<CategoriesEntity>(
      `/categories/rupdate/${categorieDetails.id}`,
      categorieDetails
    );
  }

  assignCategorieRoles(categorieDetails: any) {
    return this.apiService.put<CategoriesEntity>(
      `/categories/assign-roles/${categorieDetails.categorieId}`,
      categorieDetails
    );
  }

  deleteCategorie(categorieId: string | number) {
    return this.apiService.delete(`/categories/${categorieId}`);
  }

  getAllCategories() {
    return this.apiService.get<CategoriesEntity[]>(`/categories/all`);
  }
}
