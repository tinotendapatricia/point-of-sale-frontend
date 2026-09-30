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
import { Router } from '@angular/router';

import { ToastService } from './toast/toast.service';
import { tokenInterceptor } from './token-interceptor.service';

describe('tokenInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  const toast = { error: jest.fn(), info: jest.fn() };
  const router = { navigate: jest.fn(() => Promise.resolve(true)) };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toast },
        { provide: Router, useValue: router },
      ],
    });
    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('adds the bearer token when there is a session', () => {
    sessionStorage.setItem('accessToken', 'abc');
    http.get('/x').subscribe();
    const req = controller.expectOne('/x');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc');
    req.flush({});
  });

  it('clears the session and goes to login on 401', () => {
    sessionStorage.setItem('accessToken', 'abc');
    http.get('/x').subscribe({ error: () => undefined });
    for (let i = 0; i < 2; i++) {
      controller
        .expectOne('/x')
        .flush({ message: 'nope' }, { status: 401, statusText: 'Unauthorized' });
    }
    expect(toast.error).toHaveBeenCalledWith('nope');
    expect(sessionStorage.getItem('accessToken')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['auth', 'login']);
  });
});
