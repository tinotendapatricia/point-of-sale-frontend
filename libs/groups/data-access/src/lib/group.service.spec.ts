import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
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
    service = TestBed.inject(GroupService);
  });

  it('gets paginated groups with page params', () => {
    service.getPaginatedGroups({ page: 2, size: 5 });
    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      { get: (k: string) => string | null },
    ];
    expect(path).toBe('/groups/list');
    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('5');
  });

  it('creates a group', () => {
    const details = { name: 'Cashiers' };
    service.createGroup(details);
    expect(api.post).toHaveBeenCalledWith('/groups/create', details);
  });

  it('assigns group roles', () => {
    const details = { groupId: 4, roles: ['1', '2'] };
    service.assignGroupRoles(details);
    expect(api.put).toHaveBeenCalledWith('/groups/assign-roles/4', details);
  });

  it('gets a group', () => {
    service.getGroup(4);
    expect(api.get).toHaveBeenCalledWith('/groups/4');
  });

  it('updates a group', () => {
    const details = { id: 4, name: 'Cashiers' };
    service.updateGroup(details);
    expect(api.put).toHaveBeenCalledWith('/groups/rupdate/4', details);
  });

  it('deletes a group', () => {
    service.deleteGroup(4);
    expect(api.delete).toHaveBeenCalledWith('/groups/4');
  });

  it('gets all groups', () => {
    service.getAllGroups();
    expect(api.get).toHaveBeenCalledWith('/groups/all');
  });
});
