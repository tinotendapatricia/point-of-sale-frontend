import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { UpdateRateComponent } from './update-rate.component';

describe('UpdateRateComponent', () => {
  let fixture: ComponentFixture<UpdateRateComponent>;
  const store = { updateRateLoading: () => false, updateRate: jest.fn() };
  const dialogRef = { close: jest.fn() };

  const el = () => fixture.nativeElement as HTMLElement;
  const rateInput = () => el().querySelector<HTMLInputElement>('#rate-value')!;
  const submit = () =>
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  beforeEach(async () => {
    store.updateRate.mockClear();
    dialogRef.close.mockClear();
    await TestBed.configureTestingModule({
      imports: [UpdateRateComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { currency: { id: 3, code: 'ZWG', rate: 13.5 } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateRateComponent);
    fixture.detectChanges();
  });

  it('pre-fills the current rate and shows the code', () => {
    expect(rateInput().value).toBe('13.5');
    expect(el().textContent).toContain('ZWG');
  });

  it('updates the rate and closes the dialog', () => {
    rateInput().value = '25';
    rateInput().dispatchEvent(new Event('input'));

    submit();

    expect(store.updateRate).toHaveBeenCalledWith({
      data: { id: 3, rate: 25, effectiveDate: '' },
      callback: expect.any(Function),
    });
    store.updateRate.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit a negative rate', () => {
    rateInput().value = '-1';
    rateInput().dispatchEvent(new Event('input'));

    submit();

    expect(store.updateRate).not.toHaveBeenCalled();
  });
});
