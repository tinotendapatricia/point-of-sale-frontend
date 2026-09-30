import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DrawerRef } from '@pos-frontend/core';
import { ProductStore } from '@pos-frontend/products/data-access';
import { CreateProductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  const store = { createLoading: () => false, createProduct: jest.fn() };
  const drawerRef = { close: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        { provide: DrawerRef, useValue: drawerRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates the product and closes the drawer on success', () => {
    const el: HTMLElement = fixture.nativeElement;
    const fill = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(id)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    fill('#product-name', 'Cola');
    fill('#product-code', 'C1');
    fill('#product-barcode', '600100');

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(store.createProduct).toHaveBeenCalledWith({
      data: { name: 'Cola', code: 'C1', barcode: '600100', active: false },
      callback: expect.any(Function),
    });
    store.createProduct.mock.calls[0][0].callback();
    expect(drawerRef.close).toHaveBeenCalledWith(true);
  });
});
