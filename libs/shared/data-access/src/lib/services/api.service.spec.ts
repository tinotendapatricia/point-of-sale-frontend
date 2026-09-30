import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService, BASE_URL } from './api.service';
import { toHttpParams } from './http-params';

describe('ApiService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'http://api' },
      ],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('prefixes the base url', () => {
    service.get('/things').subscribe();
    http.expectOne('http://api/things').flush([]);
  });

  it('drops undefined values when building params', () => {
    const params = toHttpParams({ page: 0, name: undefined, size: 10 });
    expect(params.keys()).toEqual(['page', 'size']);
  });
});
