import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdatePriceComponent } from './update-price.component';

describe('UpdatePriceComponent', () => {
  let fixture: ComponentFixture<UpdatePriceComponent>;
  const store = { updateLoading: () => false, updatePrice: jest.fn() };
  const dialogRef = { close: jest.fn() };
  const product = { id: 7, name: 'Sugar 2kg', price: [{ value: 1.5 }] };

  const el = () => fixture.nativeElement as HTMLElement;
  const input = () => el().querySelector<HTMLInputElement>('#price-value')!;
  const submit = () =>
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  beforeEach(async () => {
    store.updatePrice.mockClear();
    dialogRef.close.mockClear();
    await TestBed.configureTestingModule({
      imports: [UpdatePriceComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { product } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePriceComponent);
    fixture.detectChanges();
  });

  it('pre-fills the current price and shows the product name', () => {
    expect(input().value).toBe('1.5');
    expect(el().textContent).toContain('Sugar 2kg');
  });

  it('updates the price and closes the dialog', () => {
    input().value = '2';
    input().dispatchEvent(new Event('input'));

    submit();

    expect(store.updatePrice).toHaveBeenCalledWith({
      data: { id: 7, price: 2, effectiveDate: '' },
      callback: expect.any(Function),
    });
    store.updatePrice.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit a negative price', () => {
    input().value = '-1';
    input().dispatchEvent(new Event('input'));

    submit();

    expect(store.updatePrice).not.toHaveBeenCalled();
  });
});
