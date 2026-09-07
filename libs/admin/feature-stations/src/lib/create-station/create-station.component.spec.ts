import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StationsFacade } from '@pos-frontend/stations/data-access';
import { CreateStationComponent } from './create-station.component';

describe('CreateStationComponent', () => {
  let component: CreateStationComponent;
  let fixture: ComponentFixture<CreateStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateStationComponent],
    providers: [
      provideNoopAnimations(),
      { provide: StationsFacade, useValue: { createNewStation: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
