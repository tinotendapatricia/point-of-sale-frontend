import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CompanyEntity, CompanyStore } from '@pos-frontend/company-details/data-access';

import { type CreateCompanyDetailsData, CreateCompanyDetailsComponent } from './create-company-details.component';

describe('CreateCompanyDetailsComponent', () => {
  let fixture: ComponentFixture<CreateCompanyDetailsComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createCompany: jest.fn(),
    updateCompany: jest.fn(),
  };
  const dialogRef = { close: jest.fn() };

  const setup = async (data: CreateCompanyDetailsData | null = null): Promise<void> => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateCompanyDetailsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CompanyStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCompanyDetailsComponent);
    fixture.detectChanges();
  };

  const el = (): HTMLElement => fixture.nativeElement;
  const set = (selector: string, value: string): void => {
    const input = el().querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  const submit = (): void => el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  it('creates the company and closes the dialog on success', async () => {
    await setup();
    set('#company-name', 'Acme');
    set('#company-bp-number', 'BP1');
    set('#company-tin-number', 'TIN1');
    set('#company-email', 'info@acme.test');
    set('#company-phone', '0772000000');

    submit();

    expect(store.createCompany).toHaveBeenCalledWith({
      data: {
        name: 'Acme',
        address: '',
        bpNumber: 'BP1',
        tinNumber: 'TIN1',
        email: 'info@acme.test',
        phone: '0772000000',
      },
      callback: expect.any(Function),
    });
    store.createCompany.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit an invalid email', async () => {
    await setup();
    set('#company-name', 'Acme');
    set('#company-bp-number', 'BP1');
    set('#company-tin-number', 'TIN1');
    set('#company-email', 'not-an-email');
    set('#company-phone', '0772000000');

    submit();

    expect(store.createCompany).not.toHaveBeenCalled();
  });

  it('updates the company passed in dialog data', async () => {
    const company: CompanyEntity = {
      id: 1,
      name: 'Acme',
      email: 'info@acme.test',
      bpNumber: 'BP1',
      address: '1 Main St',
      tinNumber: 'TIN1',
      phone: '0772000000',
      license: 'KEY',
      licenseExpDate: '',
      createdAt: '',
      updatedAt: '',
    };
    await setup({ company });
    set('#company-name', 'Acme Ltd');

    submit();

    expect(store.updateCompany).toHaveBeenCalledWith({
      data: {
        id: 1,
        name: 'Acme Ltd',
        address: '1 Main St',
        bpNumber: 'BP1',
        tinNumber: 'TIN1',
        email: 'info@acme.test',
        phone: '0772000000',
      },
      callback: expect.any(Function),
    });
  });
});
