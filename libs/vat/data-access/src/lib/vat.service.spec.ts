import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type VatEntity } from './vat.model';
import { VatService } from './vat.service';

describe('VatService', () => {
  let service: VatService;
  const api = {
    get: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(VatService);
  });

  it('gets the vat setting', () => {
    service.getVat();
    expect(api.get).toHaveBeenCalledWith('/vat/all');
  });

  it('updates the vat setting', () => {
    const vat: VatEntity = {
      id: 1,
      vat: 15,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    service.updateVat(vat);
    expect(api.put).toHaveBeenCalledWith('/vat/update/1', vat);
  });
});
