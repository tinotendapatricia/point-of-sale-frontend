import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  type CurrencyEntity,
  CurrencyStore,
} from '@pos-frontend/currencies/data-access';
import {
  CreateCurrencyComponent,
  type CreateCurrencyData,
} from './create-currency.component';

describe('CreateCurrencyComponent', () => {
  let fixture: ComponentFixture<CreateCurrencyComponent>;
  let store: Record<string, jest.Mock | (() => boolean)>;
  let dialogRef: { close: jest.Mock };

  const setup = async (data: CreateCurrencyData | null = null) => {
    store = {
      createLoading: () => false,
      updateLoading: () => false,
      createCurrency: jest.fn(),
      updateCurrency: jest.fn(),
    };
    dialogRef = { close: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [CreateCurrencyComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCurrencyComponent);
    fixture.detectChanges();
  };

  const el = () => fixture.nativeElement as HTMLElement;
  const fill = (id: string, value: string) => {
    const input = el().querySelector<HTMLInputElement>(id)!;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  const submit = () =>
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  it('creates a non-default currency and closes the dialog', async () => {
    await setup();
    fill('#currency-name', 'US Dollar');
    fill('#currency-code', 'USD');
    fill('#currency-symbol', '$');

    submit();

    expect(store['createCurrency']).toHaveBeenCalledWith({
      data: { name: 'US Dollar', code: 'USD', symbol: '$', isDefault: false },
      callback: expect.any(Function),
    });
    (store['createCurrency'] as jest.Mock).mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit while invalid', async () => {
    await setup();

    submit();

    expect(store['createCurrency']).not.toHaveBeenCalled();
  });

  it('updates the currency passed in dialog data', async () => {
    const currency: CurrencyEntity = {
      id: 1,
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      rate: 1,
      isDefault: true,
      createdAt: '',
      updatedAt: '',
    };
    await setup({ currency });
    fill('#currency-name', 'Dollar');

    submit();

    expect(store['updateCurrency']).toHaveBeenCalledWith({
      data: { ...currency, name: 'Dollar' },
      callback: expect.any(Function),
    });
  });
});
