import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [LoginFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the credentials on submit', () => {
    const emitted = jest.fn();
    component.formValue.subscribe(emitted);
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    const inputs = form.querySelectorAll('input');
    inputs[0].value = 'admin@pos.test';
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = 'secret';
    inputs[1].dispatchEvent(new Event('input'));
    form.dispatchEvent(new Event('submit'));
    expect(emitted).toHaveBeenCalledWith({ username: 'admin@pos.test', password: 'secret' });
  });

  it('does not emit an empty form', () => {
    const emitted = jest.fn();
    component.formValue.subscribe(emitted);
    (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    expect(emitted).not.toHaveBeenCalled();
  });
});
