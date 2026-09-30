import { TestBed } from '@angular/core/testing';
import { ApiService } from '@pos-frontend/shared/data-access';
import { of } from 'rxjs';

import { type UpdateStationRequest } from './station.model';
import { StationService } from './station.service';

describe('StationService', () => {
  let service: StationService;
  const api = {
    get: jest.fn(() => of({})),
    post: jest.fn(() => of({})),
    put: jest.fn(() => of({})),
    delete: jest.fn(() => of({})),
  };
  const station: UpdateStationRequest = {
    id: 1,
    name: 'Till 3',
    account: '3',
    address: '',
    contact: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(StationService);
  });

  it('gets paginated stations with page params', () => {
    service.getPaginatedStations({ page: 2, size: 10 });
    const [path, params] = api.get.mock.calls[0] as unknown as [
      string,
      { get: (key: string) => string | null },
    ];
    expect(path).toBe('/stations/paginated');
    expect(params.get('page')).toBe('2');
    expect(params.get('size')).toBe('10');
  });

  it('creates a station', () => {
    service.createStation(station);
    expect(api.post).toHaveBeenCalledWith('/stations/create', station);
  });

  it('assigns station roles', () => {
    const request = { stationId: 4, roles: [1] };
    service.assignStationRoles(request);
    expect(api.put).toHaveBeenCalledWith('/stations/assign-roles/4', request);
  });

  it('gets a station by id', () => {
    service.getStation(5);
    expect(api.get).toHaveBeenCalledWith('/stations/5');
  });

  it('updates a station', () => {
    service.updateStation(station);
    expect(api.put).toHaveBeenCalledWith('/stations/rupdate/1', station);
  });

  it('deletes a station', () => {
    service.deleteStation(7);
    expect(api.delete).toHaveBeenCalledWith('/stations/7');
  });

  it('gets all stations', () => {
    service.getAllStations();
    expect(api.get).toHaveBeenCalledWith('/stations/all');
  });
});
