import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { ConfigurationsFormComponent } from './configurations-form.component';

describe('ConfigurationsFormComponent', () => {
  let component: ConfigurationsFormComponent;
  let fixture: ComponentFixture<ConfigurationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited configuration without id or audit fields', () => {
    const configuration: ConfigurationsEntity = {
      id: 7,
      stationName: 'Till 1',
      stationNumber: 51,
      printerName: 'EPSON',
      copies: 2,
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('configuration', configuration);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ stationName: 'Till 1', stationNumber: 51, printerName: 'EPSON', copies: 2 });
  });
});
