import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AuthStore } from '@pos-frontend/auth/data-access';
import { CompanyStore } from '@pos-frontend/company-details/data-access';

import { LoginFeatureComponent } from './login-feature.component';

describe('LoginFeatureComponent', () => {
  let component: LoginFeatureComponent;
  let fixture: ComponentFixture<LoginFeatureComponent>;
  const authStore = { loginLoading: () => false, adminLogin: jest.fn() };
  const companyStore = { company: () => undefined, getCompany: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFeatureComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: AuthStore, useValue: authStore },
        { provide: CompanyStore, useValue: companyStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load the company', () => {
    expect(component).toBeTruthy();
    expect(companyStore.getCompany).toHaveBeenCalled();
  });

  it('logs in through the auth store', () => {
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const inputs = form.querySelectorAll('input');
    inputs[0].value = 'admin@pos.test';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'secret';
    inputs[1].dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));

    expect(authStore.adminLogin).toHaveBeenCalledWith(
      expect.objectContaining({ data: { username: 'admin@pos.test', password: 'secret' } })
    );
  });
});
