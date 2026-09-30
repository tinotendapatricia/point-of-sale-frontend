import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { StationStore } from '@pos-frontend/stations/data-access';
import { UpdateStationComponent } from './update-station.component';

describe('UpdateStationComponent', () => {
  let component: UpdateStationComponent;
  let fixture: ComponentFixture<UpdateStationComponent>;
  const store = {
    station: () => undefined,
    getOneLoading: () => false,
    updateLoading: () => false,
    getStation: jest.fn(),
    updateStation: jest.fn(),
  };
  const route = { snapshot: { paramMap: convertToParamMap({ stationId: '5' }) } };

  beforeEach(async () => {
    store.getStation.mockClear();
    await TestBed.configureTestingModule({
      imports: [UpdateStationComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: StationStore, useValue: store },
        { provide: ActivatedRoute, useValue: route },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the station from the route id', () => {
    expect(store.getStation).toHaveBeenCalledWith({ id: '5' });
  });
});
