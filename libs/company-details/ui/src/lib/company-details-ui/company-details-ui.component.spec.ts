import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { CompanyEntity } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsUiComponent } from './company-details-ui.component';

describe('CompanyDetailsUiComponent', () => {
  let component: CompanyDetailsUiComponent;
  let fixture: ComponentFixture<CompanyDetailsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the company fields', () => {
    const company: CompanyEntity = {
      id: 1,
      name: 'Shop',
      email: 'shop@example.com',
      bpNumber: 'BP1',
      address: '',
      tinNumber: 'TIN1',
      phone: '0772',
      license: '',
      licenseExpDate: '',
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('company', company);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('shop@example.com');
  });
});
