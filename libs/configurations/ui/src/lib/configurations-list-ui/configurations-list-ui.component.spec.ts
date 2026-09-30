import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { ConfigurationsEntity } from '@pos-frontend/configurations/data-access';
import { ConfigurationsListUiComponent } from './configurations-list-ui.component';

describe('ConfigurationsListUiComponent', () => {
  let component: ConfigurationsListUiComponent;
  let fixture: ComponentFixture<ConfigurationsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationsListUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsListUiComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('configurations', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the row on edit', () => {
    const configuration: ConfigurationsEntity = {
      id: 1,
      stationName: 'Till 1',
      stationNumber: 50,
      printerName: 'EPSON',
      copies: 1,
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('configurations', [configuration]);
    fixture.detectChanges();
    const edited = jest.fn();
    component.edited.subscribe(edited);
    fixture.nativeElement.querySelector('button[aria-label="Update configuration"]').click();
    expect(edited).toHaveBeenCalledWith(configuration);
  });
});
