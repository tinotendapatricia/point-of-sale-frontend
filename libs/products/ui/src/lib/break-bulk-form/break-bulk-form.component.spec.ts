import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BreakBulkFormComponent } from './break-bulk-form.component';

describe('BreakBulkFormComponent', () => {
  let component: BreakBulkFormComponent;
  let fixture: ComponentFixture<BreakBulkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakBulkFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakBulkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not emit until both products are chosen', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);

    fixture.nativeElement.querySelector('button[type=submit]').click();

    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits cancelled', () => {
    const cancelled = jest.fn();
    component.cancelled.subscribe(cancelled);

    fixture.nativeElement.querySelector('button[type=button]').click();

    expect(cancelled).toHaveBeenCalled();
  });
});
