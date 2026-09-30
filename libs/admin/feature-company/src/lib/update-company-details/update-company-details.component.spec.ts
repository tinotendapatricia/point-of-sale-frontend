import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CompanyEntity, CompanyStore } from '@pos-frontend/company-details/data-access';
import { DRAWER_DATA, DrawerRef } from '@pos-frontend/core';
import { UpdateCompanyDetailsComponent } from './update-company-details.component';

describe('UpdateCompanyDetailsComponent', () => {
  let component: UpdateCompanyDetailsComponent;
  let fixture: ComponentFixture<UpdateCompanyDetailsComponent>;
  const store = { updateLoading: () => false, updateCompany: jest.fn() };
  const company: CompanyEntity = {
    id: 1,
    name: 'Shop',
    email: 'shop@example.com',
    bpNumber: 'BP1',
    address: '',
    tinNumber: 'TIN1',
    phone: '0772',
    license: 'L',
    licenseExpDate: '',
    createdAt: '',
    updatedAt: '',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [UpdateCompanyDetailsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CompanyStore, useValue: store },
        { provide: DrawerRef, useValue: { close: jest.fn() } },
        { provide: DRAWER_DATA, useValue: { company } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends the edited fields with the company id', () => {
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(store.updateCompany).toHaveBeenCalledWith({
      data: {
        id: 1,
        name: 'Shop',
        address: '',
        bpNumber: 'BP1',
        tinNumber: 'TIN1',
        email: 'shop@example.com',
        phone: '0772',
      },
      callback: expect.any(Function),
    });
  });
});
