import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { ConfigureStationComponent } from './configure-station.component';

describe('ConfigureStationComponent', () => {
  let component: ConfigureStationComponent;
  let fixture: ComponentFixture<ConfigureStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ConfigureStationComponent],
    providers: [
      provideNoopAnimations(),
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: ConfigurationsService, useValue: { getAllConfigurations: () => of([]) } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ConfigureStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
