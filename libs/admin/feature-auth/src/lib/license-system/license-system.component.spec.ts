import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CompanyStore } from '@pos-frontend/company-details/data-access';
import { LicenseSystemComponent } from './license-system.component';

describe('LicenseSystemComponent', () => {
  let component: LicenseSystemComponent;
  let fixture: ComponentFixture<LicenseSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseSystemComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: CompanyStore,
          useValue: {
            company: () => undefined,
            licenseLoading: () => false,
            licenseSystem: jest.fn(),
          },
        },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LicenseSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
