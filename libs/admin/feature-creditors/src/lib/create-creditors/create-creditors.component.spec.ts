import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreditorsFacade } from '@pos-frontend/creditors/data-access';
import { CreateCreditorsComponent } from './create-creditors.component';

describe('CreateCreditorsComponent', () => {
  let component: CreateCreditorsComponent;
  let fixture: ComponentFixture<CreateCreditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CreateCreditorsComponent],
    providers: [
      provideNoopAnimations(),
      { provide: CreditorsFacade, useValue: { createNewCreditor: () => undefined, loaded$: of(false) } },
      { provide: MatDialogRef, useValue: { close: () => undefined } },
    ],
}).compileComponents();

    fixture = TestBed.createComponent(CreateCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
