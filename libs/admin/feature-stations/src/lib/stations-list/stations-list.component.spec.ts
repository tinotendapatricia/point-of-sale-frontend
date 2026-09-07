import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StationsFacade } from '@pos-frontend/stations/data-access';
import { StationsListComponent } from './stations-list.component';

describe('StationsListComponent', () => {
  let component: StationsListComponent;
  let fixture: ComponentFixture<StationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StationsListComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: StationsFacade,
        useValue: {
          allStations$: of([]),
          totalStations$: of(0),
          loading$: of(false),
          getPaginatedStations: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(StationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
