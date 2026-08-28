import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UpdateCostAndPriceComponent } from './update-cost-and-price.component';

describe('UpdateCostAndPriceComponent', () => {
  let component: UpdateCostAndPriceComponent;
  let fixture: ComponentFixture<UpdateCostAndPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCostAndPriceComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCostAndPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
