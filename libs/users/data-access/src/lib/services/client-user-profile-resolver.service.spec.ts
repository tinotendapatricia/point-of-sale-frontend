import { TestBed } from '@angular/core/testing';

import { ClientUserProfileResolverService } from './client-user-profile-resolver.service';

describe('ClientUserProfileResolverService', () => {
  let service: ClientUserProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientUserProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
