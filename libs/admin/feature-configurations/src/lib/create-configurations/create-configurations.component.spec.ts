import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { CreateConfigurationsComponent } from './create-configurations.component';

describe('CreateConfigurationsComponent', () => {
  let component: CreateConfigurationsComponent;
  let fixture: ComponentFixture<CreateConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateConfigurationsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: ConfigurationsService, useValue: {} },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
