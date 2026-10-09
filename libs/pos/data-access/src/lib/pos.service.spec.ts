import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '@pos-frontend/shared/data-access';

import { saleRequest as request } from '../testing/pos.fixtures';
import { PosService } from './pos.service';

describe('PosService', () => {
  let service: PosService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'http://api' },
      ],
    });
    service = TestBed.inject(PosService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('createPos sends POST /invoices/create', () => {
    service.createPos(request).subscribe();

    const req = http.expectOne('http://api/invoices/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({ id: 1 });
  });
});
