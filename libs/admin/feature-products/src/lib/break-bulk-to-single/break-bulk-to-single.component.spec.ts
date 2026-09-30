import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { BreakBulkToSingleComponent } from './break-bulk-to-single.component';

describe('BreakBulkToSingleComponent', () => {
  let component: BreakBulkToSingleComponent;
  let fixture: ComponentFixture<BreakBulkToSingleComponent>;
  const store = {
    products: () => [],
    breakLoading: () => false,
    breakProduct: jest.fn(),
    getAllProducts: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakBulkToSingleComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: ProductStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakBulkToSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads all products for the selects', () => {
    expect(store.getAllProducts).toHaveBeenCalled();
  });
});
