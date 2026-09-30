import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConfigurationService } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { getStationNumber } from '@pos-frontend/pos/data-access';
import { ConfigureStationComponent } from './configure-station.component';

describe('ConfigureStationComponent', () => {
  let component: ConfigureStationComponent;
  let fixture: ComponentFixture<ConfigureStationComponent>;
  const dialogRef = { close: jest.fn() };
  const toast = { success: jest.fn(), error: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    window.localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ConfigureStationComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: dialogRef },
        {
          provide: ConfigurationService,
          useValue: { getAllConfigurations: () => of([{ stationNumber: 3 }]) },
        },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('stores a known station and closes', () => {
    component['setStation']({ stationNumber: 3 });
    expect(getStationNumber()).toBe('3');
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('rejects an unknown station', () => {
    component['setStation']({ stationNumber: 8 });
    expect(getStationNumber()).toBeNull();
    expect(toast.error).toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
