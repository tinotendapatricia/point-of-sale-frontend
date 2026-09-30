import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type CompanyEntity } from './company.model';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of(null)),
  };
  const company: CompanyEntity = {
    id: 1,
    name: 'Shop',
    email: '',
    bpNumber: '',
    address: '',
    tinNumber: '',
    phone: '',
    license: '',
    licenseExpDate: '',
    createdAt: '', updatedAt: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(CompanyService);
  });

  it('creates a company', () => {
    service.createCompany(company).subscribe();
    expect(api.post).toHaveBeenCalledWith('/company/create', company);
  });

  it('licenses the system', () => {
    const request = { id: 1, license: 'KEY' };
    service.licenseSystem(request).subscribe();
    expect(api.put).toHaveBeenCalledWith('/company/license', request);
  });

  it('gets the company', () => {
    service.getCompany().subscribe();
    expect(api.get).toHaveBeenCalledWith('/company/one');
  });

  it('gets the license', () => {
    service.getLicense().subscribe();
    expect(api.get).toHaveBeenCalledWith('/company/license');
  });

  it('updates a company', () => {
    service.updateCompany(company).subscribe();
    expect(api.put).toHaveBeenCalledWith('/company/update/1', company);
  });

  it('deletes a company', () => {
    service.deleteCompany(1).subscribe();
    expect(api.delete).toHaveBeenCalledWith('/company/1');
  });

  it('gets all companies', () => {
    service.getAllCompanies().subscribe();
    expect(api.get).toHaveBeenCalledWith('/company/all');
  });
});
