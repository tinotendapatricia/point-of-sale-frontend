import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LicenseFormComponent } from './license-form.component';

describe('LicenseFormComponent', () => {
  let component: LicenseFormComponent;
  let fixture: ComponentFixture<LicenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LicenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the entered license', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#license-key');
    input.value = 'ABC-123';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ license: 'ABC-123' });
  });
});
