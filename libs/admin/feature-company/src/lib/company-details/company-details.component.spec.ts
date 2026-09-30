import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { CompanyDetailsComponent } from './company-details.component';

describe('CompanyDetailsComponent', () => {
  let component: CompanyDetailsComponent;
  let fixture: ComponentFixture<CompanyDetailsComponent>;
  const store = { company: () => undefined, getOneLoading: () => false, getCompany: jest.fn() };

  beforeEach(async () => {
    store.getCompany.mockClear();
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsComponent],
      providers: [provideNoopAnimations(), { provide: CompanyStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the company and offers to add one when none exists', () => {
    expect(store.getCompany).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain('Add New');
  });
});
