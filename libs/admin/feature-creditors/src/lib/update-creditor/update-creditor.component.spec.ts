import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { UpdateCreditorComponent } from './update-creditor.component';

describe('UpdateCreditorComponent', () => {
  let component: UpdateCreditorComponent;
  let fixture: ComponentFixture<UpdateCreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UpdateCreditorComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CreditorsFacade, useValue: { updateCreditor: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
      { provide: MAT_DIALOG_DATA, useValue: { creditor: {} } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(UpdateCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
