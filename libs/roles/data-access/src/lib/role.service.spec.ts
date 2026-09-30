import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(RoleService);
  });

  it('gets paginated roles with page params', () => {
    service.getPaginatedRoles({ page: 1, size: 10 });
    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      { get: (k: string) => string | null },
    ];
    expect(path).toBe('/v1/roles');
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('creates a role', () => {
    const details = { name: 'ADMIN' };
    service.createRole(details);
    expect(api.post).toHaveBeenCalledWith('/v1/roles', details);
  });

  it('gets a role', () => {
    service.getRole(3);
    expect(api.get).toHaveBeenCalledWith('/v1/roles/3');
  });

  it('updates a role', () => {
    const details = { id: 3, name: 'ADMIN' };
    service.updateRole(details);
    expect(api.put).toHaveBeenCalledWith('/v1/roles/3', details);
  });

  it('deletes a role', () => {
    service.deleteRole(3);
    expect(api.delete).toHaveBeenCalledWith('/v1/roles/3');
  });

  it('gets all roles', () => {
    service.getAllRoles();
    expect(api.get).toHaveBeenCalledWith('/roles/all');
  });
});
