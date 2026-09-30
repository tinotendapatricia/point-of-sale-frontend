import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const api = { get: jest.fn(() => of([])) };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(DashboardService);
  });

  it.each([
    ['getLowSelling', '/dashboard/low-selling'],
    ['getTopSelling', '/dashboard/top-selling'],
    ['getRecentTransactions', '/dashboard/recent-transactions'],
    ['getLowStock', '/dashboard/low-stock'],
  ] as const)('%s calls %s', (method, path) => {
    service[method]();
    expect(api.get).toHaveBeenCalledWith(path);
  });
});
