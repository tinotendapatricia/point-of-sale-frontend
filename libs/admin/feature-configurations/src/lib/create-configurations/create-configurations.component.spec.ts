import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  type ConfigurationsEntity,
  ConfigurationStore,
} from '@pos-frontend/configurations/data-access';
import { CreateConfigurationsComponent } from './create-configurations.component';

describe('CreateConfigurationsComponent', () => {
  let fixture: ComponentFixture<CreateConfigurationsComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createConfiguration: jest.fn(),
    updateConfiguration: jest.fn(),
  };
  const configuration: ConfigurationsEntity = {
    id: 7,
    stationName: 'Till 1',
    stationNumber: 51,
    printerName: 'EPSON',
    copies: 2,
    createdAt: '',
    updatedAt: '',
  };

  async function setup(data: unknown): Promise<void> {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateConfigurationsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ConfigurationStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateConfigurationsComponent);
    fixture.detectChanges();
  }

  it('creates a configuration', async () => {
    await setup(null);
    const el: HTMLElement = fixture.nativeElement;
    const set = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(`#${id}`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    set('config-station-name', 'Till 2');
    set('config-printer-name', 'EPSON');
    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();
    expect(store.createConfiguration).toHaveBeenCalledWith({
      data: { stationName: 'Till 2', stationNumber: 50, printerName: 'EPSON', copies: 1 },
      callback: expect.any(Function),
    });
  });

  it('sends the edited values with the original id', async () => {
    await setup({ configuration });
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateConfiguration).toHaveBeenCalledWith({
      data: { id: 7, stationName: 'Till 1', stationNumber: 51, printerName: 'EPSON', copies: 2 },
      callback: expect.any(Function),
    });
  });
});
