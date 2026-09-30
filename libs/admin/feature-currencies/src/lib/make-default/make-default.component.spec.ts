import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CurrencyStore } from '@pos-frontend/currencies/data-access';
import { MakeDefaultComponent } from './make-default.component';

describe('MakeDefaultComponent', () => {
  let component: MakeDefaultComponent;
  let fixture: ComponentFixture<MakeDefaultComponent>;
  const store = { makeDefaultLoading: () => false, makeDefault: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeDefaultComponent],
      providers: [
        provideNoopAnimations(),
        { provide: CurrencyStore, useValue: store },
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { currency: { id: 5, code: 'USD' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MakeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the currency code in the message', () => {
    expect(fixture.nativeElement.textContent).toContain('make USD the default');
  });

  it('makes the currency default on confirm', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    expect(store.makeDefault).toHaveBeenCalledWith({
      data: { id: 5 },
      callback: expect.any(Function),
    });
  });
});
