import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '@pos-frontend/shared/data-access';
import {
  type AssignCategoryRolesRequest,
  type CategoryEntity,
} from './category.model';
import { CategoryService } from './category.service';

const category: CategoryEntity = {
  id: 1,
  name: 'Drinks',
  code: 'DRK',
  createdAt: '',
  updatedAt: '',
};

describe('CategoryService', () => {
  let service: CategoryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'http://api' },
      ],
    });
    service = TestBed.inject(CategoryService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getPaginatedCategories sends GET /categories/list with params', () => {
    service.getPaginatedCategories({ page: 1, size: 20 }).subscribe();
    const req = http.expectOne((r) => r.url === 'http://api/categories/list');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('20');
    req.flush({ content: [], totalElements: 0, totalPages: 0, page: 1 });
  });

  it('createCategory sends POST /categories/create', () => {
    service.createCategory(category).subscribe();
    const req = http.expectOne('http://api/categories/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(category);
    req.flush(category);
  });

  it('assignCategoryRoles sends PUT /categories/assign-roles/:categoryId', () => {
    const details: AssignCategoryRolesRequest = {
      categoryId: 1,
      roleIds: [2, 3],
    };
    service.assignCategoryRoles(details).subscribe();
    const req = http.expectOne('http://api/categories/assign-roles/1');
    expect(req.request.method).toBe('PUT');
    req.flush(category);
  });

  it('getCategory sends GET /categories/:id', () => {
    service.getCategory(1).subscribe();
    const req = http.expectOne('http://api/categories/1');
    expect(req.request.method).toBe('GET');
    req.flush(category);
  });

  it('updateCategory sends PUT /categories/rupdate/:id', () => {
    service.updateCategory(category).subscribe();
    const req = http.expectOne('http://api/categories/rupdate/1');
    expect(req.request.method).toBe('PUT');
    req.flush(category);
  });

  it('deleteCategory sends DELETE /categories/:id', () => {
    service.deleteCategory(1).subscribe();
    const req = http.expectOne('http://api/categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getAllCategories sends GET /categories/all', () => {
    service.getAllCategories().subscribe();
    const req = http.expectOne('http://api/categories/all');
    expect(req.request.method).toBe('GET');
    req.flush([category]);
  });
});
