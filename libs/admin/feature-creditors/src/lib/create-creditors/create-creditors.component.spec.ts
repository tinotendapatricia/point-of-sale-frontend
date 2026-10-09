import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { type CreditorsEntity, CreditorStore } from '@pos-frontend/creditors/data-access';

import { type CreateCreditorsData, CreateCreditorsComponent } from './create-creditors.component';

describe('CreateCreditorsComponent', () => {
  let fixture: ComponentFixture<CreateCreditorsComponent>;
  const store = {
    createLoading: () => false,
    updateLoading: () => false,
    createCreditor: jest.fn(),
    updateCreditor: jest.fn(),
  };
  const dialogRef = { close: jest.fn() };

  const setup = async (data: CreateCreditorsData | null = null): Promise<void> => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateCreditorsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CreditorStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCreditorsComponent);
    fixture.detectChanges();
  };

  const el = (): HTMLElement => fixture.nativeElement;
  const set = (selector: string, value: string): void => {
    const input = el().querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  const submit = (): void => el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  it('creates the creditor and closes the dialog on success', async () => {
    await setup();
    set('#creditor-account', 'ACC1');
    set('#creditor-name', 'Acme');

    submit();

    expect(store.createCreditor).toHaveBeenCalledWith({
      data: { account: 'ACC1', name: 'Acme', address: '', description: '' },
      callback: expect.any(Function),
    });
    store.createCreditor.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit while invalid', async () => {
    await setup();

    submit();

    expect(store.createCreditor).not.toHaveBeenCalled();
  });

  it('updates the creditor passed in dialog data', async () => {
    const creditor: CreditorsEntity = {
      id: 4,
      account: 'ACC1',
      name: 'Acme',
      contact: '',
      address: '1 Main St',
      description: 'Supplier',
      createdAt: '',
      updatedAt: '',
    };
    await setup({ creditor });
    set('#creditor-name', 'Acme Ltd');

    submit();

    expect(store.updateCreditor).toHaveBeenCalledWith({
      data: { id: 4, account: 'ACC1', name: 'Acme Ltd', address: '1 Main St', description: 'Supplier' },
      callback: expect.any(Function),
    });
  });
});
