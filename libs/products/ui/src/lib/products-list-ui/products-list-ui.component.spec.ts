import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListUiComponent } from './products-list-ui.component';

describe('ProductsListUiComponent', () => {
  let component: ProductsListUiComponent;
  let fixture: ComponentFixture<ProductsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ProductsListUiComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ProductsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
