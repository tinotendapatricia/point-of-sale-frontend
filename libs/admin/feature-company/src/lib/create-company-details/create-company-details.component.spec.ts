import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { DrawerRef } from '@pos-frontend/core';
import { CreateCompanyDetailsComponent } from './create-company-details.component';

describe('CreateCompanyDetailsComponent', () => {
  let component: CreateCompanyDetailsComponent;
  let fixture: ComponentFixture<CreateCompanyDetailsComponent>;
  const store = { createLoading: () => false, createCompany: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateCompanyDetailsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CompanyStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes the drawer on cancel without saving', () => {
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(drawerRef.close).toHaveBeenCalledWith(false);
    expect(store.createCompany).not.toHaveBeenCalled();
  });
});
