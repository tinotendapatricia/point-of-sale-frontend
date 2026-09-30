import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { ProductsEntity } from '@pos-frontend/products/data-access';
import { ProductsFormComponent } from './products-form.component';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited values on submit', () => {
    const product: ProductsEntity = {
      id: 1,
      name: 'Cola',
      code: 'C1',
      barcode: '600100',
      active: true,
      price: [],
      cost: [],
      taxable: 'YES',
      quantity: 4,
      reorderLevel: 1,
      mass: '1',
      measuredIn: 'Litres',
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('product', product);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).toHaveBeenCalledWith({ name: 'Cola', code: 'C1', barcode: '600100', active: true });
  });

  it('does not emit while invalid', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).not.toHaveBeenCalled();
  });
});
