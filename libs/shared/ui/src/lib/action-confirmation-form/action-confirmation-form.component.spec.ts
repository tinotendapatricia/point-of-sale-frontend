import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActionConfirmationFormComponent } from './action-confirmation-form.component';

describe('ActionConfirmationFormComponent', () => {
  let component: ActionConfirmationFormComponent;
  let fixture: ComponentFixture<ActionConfirmationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ActionConfirmationFormComponent],
    providers: [provideNoopAnimations()],
}).compileComponents();

    fixture = TestBed.createComponent(ActionConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
