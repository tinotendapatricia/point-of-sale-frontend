import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationStore } from '@pos-frontend/configurations/data-access';
import { ConfigurationsListComponent } from './configurations-list.component';

describe('ConfigurationsListComponent', () => {
  let component: ConfigurationsListComponent;
  let fixture: ComponentFixture<ConfigurationsListComponent>;
  const store = {
    configurations: () => [],
    getManyLoading: () => false,
    getAllConfigurations: jest.fn(),
  };

  beforeEach(async () => {
    store.getAllConfigurations.mockClear();
    await TestBed.configureTestingModule({
      imports: [ConfigurationsListComponent],
      providers: [provideNoopAnimations(), { provide: ConfigurationStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads all configurations', () => {
    expect(store.getAllConfigurations).toHaveBeenCalled();
  });
});
