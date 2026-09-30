import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { AuditService } from './audit.service';

describe('AuditService', () => {
  let service: AuditService;
  const api = { get: jest.fn(() => of({ content: [], totalElements: 0 })) };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(AuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPaginatedAudits sends page and size, dropping empty filters', () => {
    service.getPaginatedAudits({ page: 1, size: 10, search: undefined });

    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      { get(key: string): string | null; has(key: string): boolean }
    ];
    expect(path).toBe('/audits/paginated');
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
    expect(params.has('search')).toBe(false);
  });
});
