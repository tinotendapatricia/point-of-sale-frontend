import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '@pos-frontend/shared/data-access';
import { type CurrencyEntity, type UpdateRateRequest } from './currency.model';
import { CurrencyService } from './currency.service';

const currency: CurrencyEntity = {
  id: 1,
  code: 'USD',
  name: 'US Dollar',
  symbol: '$',
  rate: 1,
  isDefault: true,
  createdAt: '',
  updatedAt: '',
};

describe('CurrencyService', () => {
  let service: CurrencyService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'http://api' },
      ],
    });
    service = TestBed.inject(CurrencyService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getPaginatedCurrencies sends GET /currencies/paginated with params', () => {
    service.getPaginatedCurrencies({ page: 0, size: 10 }).subscribe();
    const req = http.expectOne(
      (r) => r.url === 'http://api/currencies/paginated'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('10');
    req.flush({ content: [], totalElements: 0, totalPages: 0, page: 0 });
  });

  it('createCurrency sends POST /currencies/create', () => {
    service.createCurrency(currency).subscribe();
    const req = http.expectOne('http://api/currencies/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(currency);
    req.flush(currency);
  });

  it('makeDefaultCurrency sends PATCH /currencies/default/:id', () => {
    service.makeDefaultCurrency({ id: 1 }).subscribe();
    const req = http.expectOne('http://api/currencies/default/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(currency);
  });

  it('getCurrency sends GET /currencies/:id', () => {
    service.getCurrency(1).subscribe();
    const req = http.expectOne('http://api/currencies/1');
    expect(req.request.method).toBe('GET');
    req.flush(currency);
  });

  it('getDefaultCurrency sends GET /currencies/default', () => {
    service.getDefaultCurrency().subscribe();
    const req = http.expectOne('http://api/currencies/default');
    expect(req.request.method).toBe('GET');
    req.flush(currency);
  });

  it('updateCurrency sends PUT /currencies/update/:id', () => {
    service.updateCurrency(currency).subscribe();
    const req = http.expectOne('http://api/currencies/update/1');
    expect(req.request.method).toBe('PUT');
    req.flush(currency);
  });

  it('updateRate sends PUT /rates/update/:id', () => {
    const details: UpdateRateRequest = {
      id: 1,
      rate: 13.5,
      effectiveDate: '2026-01-01',
    };
    service.updateRate(details).subscribe();
    const req = http.expectOne('http://api/rates/update/1');
    expect(req.request.method).toBe('PUT');
    req.flush(currency);
  });

  it('deleteCurrency sends DELETE /currencies/:id', () => {
    service.deleteCurrency(1).subscribe();
    const req = http.expectOne('http://api/currencies/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('getAllCurrencies sends GET /currencies/all', () => {
    service.getAllCurrencies().subscribe();
    const req = http.expectOne('http://api/currencies/all');
    expect(req.request.method).toBe('GET');
    req.flush([currency]);
  });
});
