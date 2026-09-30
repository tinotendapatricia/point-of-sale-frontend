import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StationFormComponent } from './station-form.component';

describe('StationFormComponent', () => {
  let component: StationFormComponent;
  let fixture: ComponentFixture<StationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StationFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(StationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the station number on submit', () => {
    const emitted = jest.fn();
    component.formValue.subscribe(emitted);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '3';
    input.dispatchEvent(new Event('input'));
    (fixture.nativeElement.querySelector('form') as HTMLFormElement).dispatchEvent(new Event('submit'));
    expect(emitted).toHaveBeenCalledWith({ stationNumber: 3 });
  });
});
