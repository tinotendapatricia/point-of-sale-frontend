import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LowSellingProductComponent } from './low-selling-product.component';

describe('LowSellingProductComponent', () => {
  let component: LowSellingProductComponent;
  let fixture: ComponentFixture<LowSellingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LowSellingProductComponent],
}).compileComponents();

    fixture = TestBed.createComponent(LowSellingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
