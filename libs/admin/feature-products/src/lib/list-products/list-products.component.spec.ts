import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { ListProductsComponent } from './list-products.component';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;
  const store = {
    paginatedProducts: () => [],
    totalProducts: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedProducts: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductsComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedProducts).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
