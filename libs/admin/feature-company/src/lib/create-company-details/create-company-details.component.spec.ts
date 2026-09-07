import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { CreateCompanyDetailsComponent } from './create-company-details.component';

describe('CreateCompanyDetailsComponent', () => {
  let component: CreateCompanyDetailsComponent;
  let fixture: ComponentFixture<CreateCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateCompanyDetailsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CompanyService, useValue: {} },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
