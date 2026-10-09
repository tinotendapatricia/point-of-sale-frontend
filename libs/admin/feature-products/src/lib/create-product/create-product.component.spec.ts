import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import {
  type ProductsEntity,
  ProductStore,
} from '@pos-frontend/products/data-access';
import {
  CreateProductComponent,
  type CreateProductData,
} from './create-product.component';

describe('CreateProductComponent', () => {
  let fixture: ComponentFixture<CreateProductComponent>;
  let store: Record<string, jest.Mock | (() => boolean)>;
  let dialogRef: { close: jest.Mock };

  const setup = async (data: CreateProductData | null = null) => {
    store = {
      createLoading: () => false,
      updateLoading: () => false,
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
    };
    dialogRef = { close: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
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

  it('creates a product and closes the dialog', async () => {
    await setup();
    fill('#product-name', 'Sugar 2kg');
    fill('#product-code', 'SUG2');
    fill('#product-barcode', '600123');

    submit();

    expect(store['createProduct']).toHaveBeenCalledWith({
      data: { name: 'Sugar 2kg', code: 'SUG2', barcode: '600123', active: false },
      callback: expect.any(Function),
    });
    (store['createProduct'] as jest.Mock).mock.calls[0][0].callback();
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('does not submit while invalid', async () => {
    await setup();

    submit();

    expect(store['createProduct']).not.toHaveBeenCalled();
  });

  it('updates the product passed in dialog data', async () => {
    const product: ProductsEntity = {
      id: 7,
      name: 'Sugar 2kg',
      code: 'SUG2',
      barcode: '600123',
      active: true,
      price: [],
      cost: [],
      taxable: '',
      quantity: 0,
      reorderLevel: 0,
      mass: '',
      measuredIn: '',
      createdAt: '',
      updatedAt: '',
    };
    await setup({ product });
    fill('#product-name', 'Sugar 2 kg');

    submit();

    expect(store['updateProduct']).toHaveBeenCalledWith({
      data: { ...product, name: 'Sugar 2 kg' },
      callback: expect.any(Function),
    });
  });
});
