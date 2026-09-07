import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { UpdateCompanyDetailsComponent } from './update-company-details.component';

describe('UpdateCompanyDetailsComponent', () => {
  let component: UpdateCompanyDetailsComponent;
  let fixture: ComponentFixture<UpdateCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCompanyDetailsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CompanyService, useValue: {} },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { company: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
