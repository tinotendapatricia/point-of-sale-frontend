import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { ConfigurationsListComponent } from './configurations-list.component';

describe('ConfigurationsListComponent', () => {
  let component: ConfigurationsListComponent;
  let fixture: ComponentFixture<ConfigurationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConfigurationsListComponent],
    providers: [
      provideNoopAnimations(),
      { provide: ConfigurationsService, useValue: { getAllConfigurations: () => of([]) } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ConfigurationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
