import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthFacade } from '@pos-frontend/auth/data-access';
import { CompanyService } from '@pos-frontend/company-details/data-access';
import { ConfigurationsService } from '@pos-frontend/configurations/data-access';
import { CustomerLoginComponent } from './customer-login.component';

describe('CustomerLoginComponent', () => {
  let component: CustomerLoginComponent;
  let fixture: ComponentFixture<CustomerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CustomerLoginComponent],
    providers: [
      provideNoopAnimations(),
      {
        provide: AuthFacade,
        useValue: { authBtnState$: of(undefined), adminLogin: () => undefined, logout: () => undefined },
      },
      { provide: CompanyService, useValue: { getCompany: () => of({}) } },
      { provide: ConfigurationsService, useValue: { getAllConfigurations: () => of([]) } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CustomerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
