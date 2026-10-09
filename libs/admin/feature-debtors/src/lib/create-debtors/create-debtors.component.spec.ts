import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { type DebtorsEntity, DebtorStore } from '@pos-frontend/debtors/data-access';

import { type CreateDebtorsData, CreateDebtorsComponent } from './create-debtors.component';

describe('CreateDebtorsComponent', () => {
  let fixture: ComponentFixture<CreateDebtorsComponent>;
  const debtorStore = {
    createLoading: () => false,
    updateLoading: () => false,
    createDebtor: jest.fn(),
    updateDebtor: jest.fn(),
  };
  const currencyStore = { currencies: () => [], getAllCurrencies: jest.fn() };
  const dialogRef = { close: jest.fn() };

  const setup = async (data: CreateDebtorsData | null = null): Promise<void> => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [CreateDebtorsComponent],
      providers: [
        provideNoopAnimations(),
        { provide: DebtorStore, useValue: debtorStore },
        { provide: CurrencyStore, useValue: currencyStore },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDebtorsComponent);
    fixture.detectChanges();
  };

  const el = (): HTMLElement => fixture.nativeElement;
  const set = (selector: string, value: string): void => {
    const input = el().querySelector<HTMLInputElement>(selector)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  const submit = (): void => el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  it('loads the currencies for the select', async () => {
    await setup();
    expect(currencyStore.getAllCurrencies).toHaveBeenCalled();
  });

  it('does not submit without a currency', async () => {
    await setup();
    set('#debtor-name', 'Jane');
    set('#debtor-account', 'D1');

    submit();

    expect(debtorStore.createDebtor).not.toHaveBeenCalled();
  });

  it('updates the debtor passed in dialog data and closes the dialog', async () => {
    const debtor: DebtorsEntity = {
      id: 9,
      name: 'Jane',
      account: 'D1',
      discount: 5,
      currency: { id: 2, name: 'US Dollar', rate: [] },
      createdAt: '',
      updatedAt: '',
    };
    await setup({ debtor });
    set('#debtor-name', 'Jane Doe');

    submit();

    expect(debtorStore.updateDebtor).toHaveBeenCalledWith({
      data: { id: 9, name: 'Jane Doe', account: 'D1', currency: 2, discount: 5 },
      callback: expect.any(Function),
    });
    debtorStore.updateDebtor.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });
});
