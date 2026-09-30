import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { StockTakeService } from './stock-take.service';

describe('StockTakeService', () => {
  let service: StockTakeService;
  const api = {
    get: jest.fn(() => of([])),
    post: jest.fn(() => of({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(StockTakeService);
  });

  it('creates a stock take batch', () => {
    service.createStockTakeBatch().subscribe();
    expect(api.post).toHaveBeenCalledWith('/stock-take/create', {});
  });

  it('adds products to a batch', () => {
    const request = { batchNumber: 4, products: [] };
    service.addProductsToBatch(request).subscribe();
    expect(api.post).toHaveBeenCalledWith(
      '/stock-take/add-product-to-batch',
      request
    );
  });

  it('adjusts stock', () => {
    const request = { batchNumber: 4, values: [], adjustedValues: [] };
    service.adjustStock(request).subscribe();
    expect(api.post).toHaveBeenCalledWith('/stock-adjustment/adjust', request);
  });

  it('gets the products in a batch', () => {
    service.getBatchProducts(4).subscribe();
    expect(api.get).toHaveBeenCalledWith('/stock-take/get-batch-products/4');
  });
});
