import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StationStore } from '@pos-frontend/stations/data-access';

import { type CreateStationData, CreateStationComponent } from './create-station.component';

describe('CreateStationComponent', () => {
  let fixture: ComponentFixture<CreateStationComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createStation: jest.fn(),
    updateStation: jest.fn(),
  };
  const dialogRef = { close: jest.fn() };

  const setup = async (data: CreateStationData | null = null): Promise<void> => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateStationComponent],
      providers: [
        provideNoopAnimations(),
        { provide: StationStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStationComponent);
    fixture.detectChanges();
  };

  const el = (): HTMLElement => fixture.nativeElement;
  const set = (selector: string, value: string): void => {
    const input = el().querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  const submit = (): void => el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  it('creates the station and closes the dialog on success', async () => {
    await setup();
    set('#station-account', '101');
    set('#station-name', 'Till 1');

    submit();

    expect(store.createStation).toHaveBeenCalledWith({
      data: { account: '101', name: 'Till 1', address: '', contact: '' },
      callback: expect.any(Function),
    });
    store.createStation.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit while invalid', async () => {
    await setup();

    submit();

    expect(store.createStation).not.toHaveBeenCalled();
  });

  it('updates the station passed in dialog data', async () => {
    await setup({ station: { id: 3, number: 101, name: 'Till 1', createdAt: '', updatedAt: '' } });
    set('#station-name', 'Front Till');

    submit();

    expect(store.updateStation).toHaveBeenCalledWith({
      data: { id: 3, account: '101', name: 'Front Till', address: '', contact: '' },
      callback: expect.any(Function),
    });
  });
});
