import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ListProductsComponent } from './list-products.component';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ListProductsComponent],
    providers: [
      provideRouter([]),
      provideNoopAnimations(),
      {
        provide: ProductStore,
        useValue: {
          paginatedProducts: () => [],
          totalProducts: () => 0,
          getPaginatedLoading: () => false,
          getPaginatedProducts: () => undefined,
          getProduct: () => undefined,
        },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
