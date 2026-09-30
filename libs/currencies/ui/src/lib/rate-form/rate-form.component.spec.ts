import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { RateFormComponent } from './rate-form.component';

describe('RateFormComponent', () => {
  let component: RateFormComponent;
  let fixture: ComponentFixture<RateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(RateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits rate and effective date on submit', () => {
    const el: HTMLElement = fixture.nativeElement;
    const rate = el.querySelector<HTMLInputElement>('#rate-value')!;
    rate.value = '13.5';
    rate.dispatchEvent(new Event('input'));
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    el.querySelector<HTMLButtonElement>('button[type=submit]')!.click();

    expect(emitted).toHaveBeenCalledWith({ rate: 13.5, effectiveDate: '' });
  });

  it('emits cancelled', () => {
    const cancelled = jest.fn();
    component.cancelled.subscribe(cancelled);

    fixture.nativeElement.querySelector('button[type=button]').click();

    expect(cancelled).toHaveBeenCalled();
  });
});
