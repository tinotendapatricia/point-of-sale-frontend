import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductStore } from '@pos-frontend/products/data-access';
import { BreakBulkToSingleComponent } from './break-bulk-to-single.component';

describe('BreakBulkToSingleComponent', () => {
  let component: BreakBulkToSingleComponent;
  let fixture: ComponentFixture<BreakBulkToSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BreakBulkToSingleComponent],
    providers: [
      provideRouter([]),
      {
        provide: ProductStore,
        useValue: { breakLoading: () => false, breakProduct: () => undefined, getAllProducts: () => undefined, products: () => [] },
      },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(BreakBulkToSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
