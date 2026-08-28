import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PriceListFormComponent } from './price-list-form.component';

describe('PriceListFormComponent', () => {
  let component: PriceListFormComponent;
  let fixture: ComponentFixture<PriceListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PriceListFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(PriceListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
