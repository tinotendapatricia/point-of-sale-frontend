import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type ConfigurationsEntity } from './configuration.model';
import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of(null)),
  };
  const configuration: ConfigurationsEntity = {
    id: 7,
    stationName: 'Till 1',
    printerName: '',
    stationNumber: 1,
    copies: 1,
    createdAt: '', updatedAt: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('gets paginated configurations with page/size params', () => {
    service.getPaginatedConfigurations({ page: 1, size: 10 }).subscribe();
    const [path, params] = api.get.mock.calls[0] as unknown as [string, { get: (k: string) => string }];
    expect(path).toBe('/configurations/paginated');
    expect(params.get('page')).toBe('1');
    expect(params.get('size')).toBe('10');
  });

  it('creates a configuration', () => {
    service.createConfiguration(configuration).subscribe();
    expect(api.post).toHaveBeenCalledWith('/configurations/create', configuration);
  });

  it('assigns configuration roles', () => {
    const request = { configurationId: 7 };
    service.assignConfigurationRoles(request).subscribe();
    expect(api.put).toHaveBeenCalledWith('/configurations/assign-roles/7', request);
  });

  it('gets a configuration', () => {
    service.getConfiguration(7).subscribe();
    expect(api.get).toHaveBeenCalledWith('/configurations/7');
  });

  it('updates a configuration', () => {
    service.updateConfiguration(configuration).subscribe();
    expect(api.put).toHaveBeenCalledWith('/configurations/update/7', configuration);
  });

  it('deletes a configuration', () => {
    service.deleteConfiguration(7).subscribe();
    expect(api.delete).toHaveBeenCalledWith('/configurations/7');
  });

  it('gets all configurations', () => {
    service.getAllConfigurations().subscribe();
    expect(api.get).toHaveBeenCalledWith('/configurations/all');
  });

  it('gets pending cash-ups', () => {
    service.getPendingCashups().subscribe();
    expect(api.get).toHaveBeenCalledWith('/cash-up/pending');
  });
});
