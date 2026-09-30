import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type DebtorRequest } from './debtor.model';
import { DebtorService } from './debtor.service';

describe('DebtorService', () => {
  let service: DebtorService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of({})),
  };
  const details: DebtorRequest = {
    id: 1,
    name: 'Acme',
    account: 'ACC-1',
    discount: 0,
    currency: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(DebtorService);
  });

  it('gets paginated debtors with page params', () => {
    service.getPaginatedDebtors({ page: 1, size: 10 });
    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      { get: (key: string) => string | null },
    ];
    expect(path).toBe('/debtors/paginated');
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('creates a debtor', () => {
    service.createDebtor(details);
    expect(api.post).toHaveBeenCalledWith('/debtors/create', details);
  });

  it('assigns debtor roles', () => {
    const request = { debtorId: 3, roles: [1] };
    service.assignDebtorRoles(request);
    expect(api.put).toHaveBeenCalledWith('/debtors/assign-roles/3', request);
  });

  it('gets a debtor by id', () => {
    service.getDebtor(5);
    expect(api.get).toHaveBeenCalledWith('/debtors/5');
  });

  it('updates a debtor', () => {
    service.updateDebtor({ ...details, id: 1 });
    expect(api.put).toHaveBeenCalledWith('/debtors/update/1', {
      ...details,
      id: 1,
    });
  });

  it('deletes a debtor', () => {
    service.deleteDebtor(7);
    expect(api.delete).toHaveBeenCalledWith('/debtors/7');
  });

  it('gets all debtors', () => {
    service.getAllDebtors();
    expect(api.get).toHaveBeenCalledWith('/debtors/all');
  });
});
