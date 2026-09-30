import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductToPriceListFormComponent } from './add-product-to-price-list-form.component';

describe('AddProductToPriceListFormComponent', () => {
  let component: AddProductToPriceListFormComponent;
  let fixture: ComponentFixture<AddProductToPriceListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AddProductToPriceListFormComponent],
}).compileComponents();

    fixture = TestBed.createComponent(AddProductToPriceListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
