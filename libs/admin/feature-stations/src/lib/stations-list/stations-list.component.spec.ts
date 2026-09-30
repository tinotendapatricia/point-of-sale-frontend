import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { StationStore } from '@pos-frontend/stations/data-access';
import { StationsListComponent } from './stations-list.component';

describe('StationsListComponent', () => {
  let component: StationsListComponent;
  let fixture: ComponentFixture<StationsListComponent>;
  const store = {
    paginatedStations: () => [],
    totalStations: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedStations: jest.fn(),
  };

  beforeEach(async () => {
    store.getPaginatedStations.mockClear();
    await TestBed.configureTestingModule({
      imports: [StationsListComponent],
      providers: [provideRouter([]), provideNoopAnimations(), { provide: StationStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedStations).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
