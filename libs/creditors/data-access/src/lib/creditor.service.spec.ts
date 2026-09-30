import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type CreditorsEntity } from './creditor.model';
import { CreditorService } from './creditor.service';

describe('CreditorService', () => {
  let service: CreditorService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of(null)),
  };
  const creditor: CreditorsEntity = {
    id: 7,
    name: 'Acme',
    account: '',
    contact: '',
    address: '',
    createdAt: '', updatedAt: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(CreditorService);
  });

  it('gets paginated creditors with page/size params', () => {
    service.getPaginatedCreditors({ page: 1, size: 10 }).subscribe();
    const [path, params] = api.get.mock.calls[0] as unknown as [string, { get: (k: string) => string }];
    expect(path).toBe('/creditors/paginated');
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('creates a creditor', () => {
    service.createCreditor(creditor).subscribe();
    expect(api.post).toHaveBeenCalledWith('/creditors/create', creditor);
  });

  it('assigns creditor roles', () => {
    const request = { creditorId: 7 };
    service.assignCreditorRoles(request).subscribe();
    expect(api.put).toHaveBeenCalledWith('/creditors/assign-roles/7', request);
  });

  it('gets a creditor', () => {
    service.getCreditor(7).subscribe();
    expect(api.get).toHaveBeenCalledWith('/creditors/7');
  });

  it('updates a creditor', () => {
    service.updateCreditor(creditor).subscribe();
    expect(api.put).toHaveBeenCalledWith('/creditors/update/7', creditor);
  });

  it('deletes a creditor', () => {
    service.deleteCreditor(7).subscribe();
    expect(api.delete).toHaveBeenCalledWith('/creditors/7');
  });

  it('gets all creditors', () => {
    service.getAllCreditors().subscribe();
    expect(api.get).toHaveBeenCalledWith('/creditors/all');
  });
});
