import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { CompanyEntity } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsFormComponent } from './company-details-form.component';

describe('CompanyDetailsFormComponent', () => {
  let component: CompanyDetailsFormComponent;
  let fixture: ComponentFixture<CompanyDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits only the editable company fields', () => {
    const company: CompanyEntity = {
      id: 1,
      name: 'Shop',
      email: 'shop@example.com',
      bpNumber: 'BP1',
      address: '1 Main St',
      tinNumber: 'TIN1',
      phone: '0772',
      license: 'L',
      licenseExpDate: '',
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('company', company);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({
      name: 'Shop',
      address: '1 Main St',
      bpNumber: 'BP1',
      tinNumber: 'TIN1',
      email: 'shop@example.com',
      phone: '0772',
    });
  });
});
