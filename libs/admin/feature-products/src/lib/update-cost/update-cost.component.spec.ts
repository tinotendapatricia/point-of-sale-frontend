import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdateCostComponent } from './update-cost.component';

describe('UpdateCostComponent', () => {
  let fixture: ComponentFixture<UpdateCostComponent>;
  const store = { updateLoading: () => false, updateCost: jest.fn() };
  const dialogRef = { close: jest.fn() };
  const product = { id: 7, name: 'Sugar 2kg', cost: [{ value: 1.5 }] };

  const el = () => fixture.nativeElement as HTMLElement;
  const input = () => el().querySelector<HTMLInputElement>('#cost-value')!;
  const submit = () =>
    el().querySelector<HTMLButtonElement>('button[type=submit]')!.click();

  beforeEach(async () => {
    store.updateCost.mockClear();
    dialogRef.close.mockClear();
    await TestBed.configureTestingModule({
      imports: [UpdateCostComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { product } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCostComponent);
    fixture.detectChanges();
  });

  it('pre-fills the current cost and shows the product name', () => {
    expect(input().value).toBe('1.5');
    expect(el().textContent).toContain('Sugar 2kg');
  });

  it('updates the cost and closes the dialog', () => {
    input().value = '2';
    input().dispatchEvent(new Event('input'));

    submit();

    expect(store.updateCost).toHaveBeenCalledWith({
      data: { id: 7, cost: 2, effectiveDate: '' },
      callback: expect.any(Function),
    });
    store.updateCost.mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit a negative cost', () => {
    input().value = '-1';
    input().dispatchEvent(new Event('input'));

    submit();

    expect(store.updateCost).not.toHaveBeenCalled();
  });
});
