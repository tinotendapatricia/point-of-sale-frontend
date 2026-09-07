import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthenticationService } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';

import { LoginFeatureComponent } from './login-feature.component';

describe('LoginFeatureComponent', () => {
  let component: LoginFeatureComponent;
  let fixture: ComponentFixture<LoginFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoginFeatureComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      { provide: AuthenticationService, useValue: { adminLogin: () => of({ token: '', userId: '' }) } },
      { provide: CompanyService, useValue: { getCompany: () => of({}) } },
    ],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
