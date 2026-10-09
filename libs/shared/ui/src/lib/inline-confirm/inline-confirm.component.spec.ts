import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineConfirmComponent } from './inline-confirm.component';

describe('InlineConfirmComponent', () => {
  let fixture: ComponentFixture<InlineConfirmComponent>;
  const buttons = (): HTMLButtonElement[] => [...fixture.nativeElement.querySelectorAll('button')];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InlineConfirmComponent] }).compileComponents();

    fixture = TestBed.createComponent(InlineConfirmComponent);
    fixture.componentRef.setInput('title', 'Close batch?');
    fixture.componentRef.setInput('message', 'This saves the counted products.');
    fixture.componentRef.setInput('confirmLabel', 'Close Batch');
    fixture.detectChanges();
  });

  it('shows the title, message and confirm label', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Close batch?');
    expect(text).toContain('This saves the counted products.');
    expect(buttons()[1].textContent).toContain('Close Batch');
  });

  it('emits confirmed and cancelled', () => {
    const confirmed = jest.fn();
    const cancelled = jest.fn();
    fixture.componentInstance.confirmed.subscribe(confirmed);
    fixture.componentInstance.cancelled.subscribe(cancelled);

    buttons()[0].click();
    buttons()[1].click();

    expect(cancelled).toHaveBeenCalled();
    expect(confirmed).toHaveBeenCalled();
  });
});
