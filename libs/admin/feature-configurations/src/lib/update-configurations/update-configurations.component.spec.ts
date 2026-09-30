import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type ConfigurationsEntity, ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { UpdateConfigurationsComponent } from './update-configurations.component';

describe('UpdateConfigurationsComponent', () => {
  let component: UpdateConfigurationsComponent;
  let fixture: ComponentFixture<UpdateConfigurationsComponent>;
  const store = { updateLoading: () => false, updateConfiguration: jest.fn() };
  const configuration: ConfigurationsEntity = {
    id: 7,
    stationName: 'Till 1',
    stationNumber: 51,
    printerName: 'EPSON',
    copies: 2,
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UpdateConfigurationsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ConfigurationStore, useValue: store },
        { provide: DrawerRef, useValue: { close: jest.fn() } },
        { provide: DRAWER_DATA, useValue: { configuration } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends the edited values with the original id', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateConfiguration).toHaveBeenCalledWith({
      data: { id: 7, stationName: 'Till 1', stationNumber: 51, printerName: 'EPSON', copies: 2 },
      callback: expect.any(Function),
    });
  });
});
