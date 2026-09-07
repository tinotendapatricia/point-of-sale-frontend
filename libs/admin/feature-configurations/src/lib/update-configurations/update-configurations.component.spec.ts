import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { UpdateConfigurationsComponent } from './update-configurations.component';

describe('UpdateConfigurationsComponent', () => {
  let component: UpdateConfigurationsComponent;
  let fixture: ComponentFixture<UpdateConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateConfigurationsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: ConfigurationsService, useValue: {} },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { configuration: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
