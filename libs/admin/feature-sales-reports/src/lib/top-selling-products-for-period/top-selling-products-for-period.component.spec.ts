import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopSellingProductsForPeriodComponent } from './top-selling-products-for-period.component';

describe('TopSellingProductsForPeriodComponent', () => {
  let component: TopSellingProductsForPeriodComponent;
  let fixture: ComponentFixture<TopSellingProductsForPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopSellingProductsForPeriodComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSellingProductsForPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
