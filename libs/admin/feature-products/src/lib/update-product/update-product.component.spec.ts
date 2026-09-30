import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdateProductComponent } from './update-product.component';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  const store = {
    product: () => undefined,
    getOneLoading: () => false,
    updateLoading: () => false,
    getProduct: jest.fn(),
    updateProduct: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ productId: '9' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the product from the route id', () => {
    expect(store.getProduct).toHaveBeenCalledWith({ id: '9' });
  });
});
