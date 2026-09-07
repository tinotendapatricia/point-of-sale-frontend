import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CurrenciesFacade } from '@pos-frontend/currencies/data-access';
import { MakeDefaultComponent } from './make-default.component';

describe('MakeDefaultComponent', () => {
  let component: MakeDefaultComponent;
  let fixture: ComponentFixture<MakeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MakeDefaultComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CurrenciesFacade, useValue: { makeDefault: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { currency: { code: 'USD' } } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(MakeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
