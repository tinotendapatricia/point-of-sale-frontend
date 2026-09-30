import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '@pos-frontend/shared/data-access';
import {
  type BreakProductRequest,
  type ProductsEntity,
  type UpdateCostRequest,
  type UpdatePriceRequest,
} from './product.model';
import { ProductService } from './product.service';

const product: ProductsEntity = {
  id: 1,
  name: 'Sugar',
  code: 'SUG',
  barcode: '',
  active: true,
  price: [],
  cost: [],
  taxable: 'YES',
  quantity: 0,
  reorderLevel: 0,
  mass: '',
  measuredIn: '',
  createdAt: '',
  updatedAt: '',
};

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'http://api' },
      ],
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getPaginatedProducts sends GET /products/paginated with params', () => {
    service.getPaginatedProducts({ page: 0, size: 10 }).subscribe();
    const req = http.expectOne(
      (r) => r.url === 'http://api/products/paginated'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');
    req.flush({ content: [], totalElements: 0, totalPages: 0, page: 0 });
  });

  it('createProduct sends POST /products/create/', () => {
    service.createProduct(product).subscribe();
    const req = http.expectOne('http://api/products/create/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush(product);
  });

  it('breakProduct sends PUT /products/break', () => {
    const details: BreakProductRequest = {
      parentId: 1,
      childId: 2,
      quantity: 3,
      parentSize: 12,
    };
    service.breakProduct(details).subscribe();
    const req = http.expectOne('http://api/products/break');
    expect(req.request.method).toBe('PUT');
    req.flush(product);
  });

  it('getProduct sends GET /products/:id', () => {
    service.getProduct(1).subscribe();
    const req = http.expectOne('http://api/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(product);
  });

  it('updateProduct sends PUT /products/update/:id', () => {
    service.updateProduct(product).subscribe();
    const req = http.expectOne('http://api/products/update/1');
    expect(req.request.method).toBe('PUT');
    req.flush(product);
  });

  it('updateCost sends POST /costs/update-cost/:id', () => {
    const details: UpdateCostRequest = {
      id: 1,
      cost: 2.5,
      effectiveDate: '2026-01-01',
    };
    service.updateCost(details).subscribe();
    const req = http.expectOne('http://api/costs/update-cost/1');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(details);
    req.flush(product);
  });

  it('updatePrice sends POST /prices/update-price/:id', () => {
    const details: UpdatePriceRequest = {
      id: 1,
      price: 3.5,
      effectiveDate: '2026-01-01',
    };
    service.updatePrice(details).subscribe();
    const req = http.expectOne('http://api/prices/update-price/1');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(details);
    req.flush(product);
  });

  it('deleteProduct sends DELETE /products/:id', () => {
    service.deleteProduct(1).subscribe();
    const req = http.expectOne('http://api/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getAllProducts sends GET /products/all', () => {
    service.getAllProducts().subscribe();
    const req = http.expectOne('http://api/products/all');
    expect(req.request.method).toBe('GET');
    req.flush([product]);
  });
});
