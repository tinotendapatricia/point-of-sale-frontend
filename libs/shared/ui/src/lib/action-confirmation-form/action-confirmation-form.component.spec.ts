import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionConfirmationFormComponent } from './action-confirmation-form.component';

describe('ActionConfirmationFormComponent', () => {
  let component: ActionConfirmationFormComponent;
  let fixture: ComponentFixture<ActionConfirmationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionConfirmationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
