import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthStore } from '@pos-frontend/auth/data-access';
import {
  type CompanyEntity,
  CompanyStore,
} from '@pos-frontend/company-details/data-access';
import { ConfigurationService } from '@pos-frontend/configurations/data-access';
import { ToastService } from '@pos-frontend/core';
import { setStationNumber } from '@pos-frontend/pos/data-access';
import { CustomerLoginComponent } from './customer-login.component';

describe('CustomerLoginComponent', () => {
  let component: CustomerLoginComponent;
  let fixture: ComponentFixture<CustomerLoginComponent>;
  const company = signal<Partial<CompanyEntity> | undefined>(undefined);
  const authStore = {
    loginLoading: () => false,
    adminLogin: jest.fn(),
    logout: jest.fn(),
  };
  const configService = {
    getAllConfigurations: jest.fn(() => of([{ stationNumber: 4 }])),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    window.localStorage.clear();
    company.set(undefined);
    await TestBed.configureTestingModule({
      imports: [CustomerLoginComponent],
      providers: [
        provideNoopAnimations(),
        provideRouter([]),
        { provide: AuthStore, useValue: authStore },
        { provide: CompanyStore, useValue: { company, getCompany: jest.fn() } },
        { provide: ConfigurationService, useValue: configService },
        { provide: ToastService, useValue: { error: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logs in when this till station is configured', () => {
    setStationNumber(4);
    component['login']({ username: 'u', password: 'p' });
    expect(authStore.adminLogin).toHaveBeenCalled();
  });

  it('refuses to log in from an unknown station', () => {
    setStationNumber(9);
    component['login']({ username: 'u', password: 'p' });
    expect(authStore.adminLogin).not.toHaveBeenCalled();
    expect(authStore.logout).toHaveBeenCalled();
  });

  it('shows the expired banner for a past license date', () => {
    company.set({ licenseExpDate: '2000-01-01', license: 'x' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('LICENSE EXPIRED');
  });
});
