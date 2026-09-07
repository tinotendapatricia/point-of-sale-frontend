import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { ProductStore } from '@pos-frontend/products/data-access';
import { UpdateProductComponent } from './update-product.component';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateProductComponent],
    providers: [
      provideRouter([]),
      {
        provide: ProductStore,
        useValue: { updateLoading: () => false, updateProduct: () => undefined, product: () => undefined },
      },
      { provide: CurrenciesFacade, useValue: { defaultCurrency$: of(undefined) } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
