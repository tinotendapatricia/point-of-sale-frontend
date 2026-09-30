import { type HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    patch: jest.fn(() => of({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(UserService);
  });

  it('gets paginated users with page params', () => {
    service.getPaginatedUsers({ page: 0, size: 20 });
    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      HttpParams,
    ];
    expect(path).toBe('/users/paginated');
    expect(params.get('page')).toBe('0');
    expect(params.get('size')).toBe('20');
  });

  it('creates a user', () => {
    const details = {
      username: 'jd',
      name: 'John',
      password: 'secret',
      group: 1,
      lastName: 'Doe',
    };
    service.createUser(details);
    expect(api.post).toHaveBeenCalledWith('/users/create', details);
  });

  it('changes user status with a status query param', () => {
    service.changeUserStatus({ userId: 7, status: false });
    const [path, body, params] = api.patch.mock.calls[0] as unknown as [
      string,
      object,
      HttpParams,
    ];
    expect(path).toBe('/v1/users/7');
    expect(body).toEqual({});
    expect(params.get('status')).toBe('false');
  });

  it('assigns user roles', () => {
    const details = { userId: 7, roles: ['1'] };
    service.assignUserRoles(details);
    expect(api.put).toHaveBeenCalledWith('/users/assign-roles/7', details);
  });

  it('gets a user by id', () => {
    service.getUser(7);
    expect(api.get).toHaveBeenCalledWith('/users/by-id/7');
  });

  it('gets the user profile', () => {
    service.getUserProfile();
    expect(api.get).toHaveBeenCalledWith('/users/my-account');
  });

  it('gets the client user profile', () => {
    service.getClientUserProfile();
    expect(api.get).toHaveBeenCalledWith('/client/v1/users/profile');
  });

  it('updates a user', () => {
    const details = { id: 7, username: 'jd', name: 'John' };
    service.updateUser(details);
    expect(api.put).toHaveBeenCalledWith('/users/update', details);
  });

  it('updates my account', () => {
    const details = { name: 'John' };
    service.updateMyAccount(details);
    expect(api.put).toHaveBeenCalledWith('/v1/accounts/my-account', details);
  });

  it('gets all users', () => {
    service.getAllUsers();
    expect(api.get).toHaveBeenCalledWith('/users/all');
  });
});
