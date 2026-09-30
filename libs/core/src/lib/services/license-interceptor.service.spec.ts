import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { licenseInterceptor } from './license-interceptor.service';

describe('licenseInterceptor', () => {
  it('adds the licence key when one is stored', () => {
    sessionStorage.setItem('license', 'lic');
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([licenseInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    TestBed.inject(HttpClient).get('/x').subscribe();
    const controller = TestBed.inject(HttpTestingController);
    const req = controller.expectOne('/x');
    expect(req.request.headers.get('KEY')).toBe('Bearer lic');
    req.flush({});
    controller.verify();
    sessionStorage.clear();
  });
});
