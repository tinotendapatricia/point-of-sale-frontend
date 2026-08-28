import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesByPeriodAndProductComponent } from './sales-by-period-and-product.component';

describe('SalesByPeriodAndProductComponent', () => {
  let component: SalesByPeriodAndProductComponent;
  let fixture: ComponentFixture<SalesByPeriodAndProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SalesByPeriodAndProductComponent],
}).compileComponents();

    fixture = TestBed.createComponent(SalesByPeriodAndProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
