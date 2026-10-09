import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
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
          provide: ConfigurationStore,
          useValue: {
            configurations: () => [{ stationNumber: 3 }],
            getManyLoading: () => false,
          },
        },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const enter = (stationNumber: number | null) => {
    const host = component as unknown as {
      form: { patchValue(v: object): void };
      submit(): void;
    };
    host.form.patchValue({ stationNumber });
    host.submit();
  };

  it('stores a known station and closes', () => {
    enter(3);
    expect(getStationNumber()).toBe('3');
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('rejects an unknown station', () => {
    enter(8);
    expect(getStationNumber()).toBeNull();
    expect(toast.error).toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('does nothing without a station number', () => {
    enter(null);
    expect(toast.error).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
