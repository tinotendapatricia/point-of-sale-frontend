import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { CurrencyEntity } from '@pos-frontend/currencies/data-access';
import { CurrencyFormComponent } from './currency-form.component';

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the edited values on submit', () => {
    const currency: CurrencyEntity = {
      id: 1,
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      rate: 1,
      isDefault: true,
      createdAt: '',
      updatedAt: '',
    };
    fixture.componentRef.setInput('currency', currency);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).toHaveBeenCalledWith({ name: 'US Dollar', code: 'USD', symbol: '$' });
  });

  it('does not emit while invalid', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).not.toHaveBeenCalled();
  });
});
