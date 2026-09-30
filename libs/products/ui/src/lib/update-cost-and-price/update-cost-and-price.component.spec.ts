import { type ComponentFixture, TestBed } from '@angular/core/testing';
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
    fixture.componentRef.setInput('mode', 'price');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('labels the amount field from the mode', () => {
    expect(fixture.nativeElement.querySelector('label[for=cost-price-amount]').textContent).toContain('Price');
  });

  it('emits the amount and effective date', () => {
    const el: HTMLElement = fixture.nativeElement;
    const amount = el.querySelector<HTMLInputElement>('#cost-price-amount')!;
    amount.value = '2.5';
    amount.dispatchEvent(new Event('input'));
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(emitted).toHaveBeenCalledWith({ amount: 2.5, effectiveDate: '' });
  });
});
