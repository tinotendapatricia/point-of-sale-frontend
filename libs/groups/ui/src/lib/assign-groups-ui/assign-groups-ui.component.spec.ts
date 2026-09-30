import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AssignGroupsUiComponent } from './assign-groups-ui.component';

describe('AssignGroupsUiComponent', () => {
  let component: AssignGroupsUiComponent;
  let fixture: ComponentFixture<AssignGroupsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignGroupsUiComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignGroupsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the group roles that start checked', () => {
    fixture.componentRef.setInput('roles', [
      { id: 'r1', name: 'VIEW_USERS', createdBy: '' },
      { id: 'r2', name: 'EDIT_USERS', createdBy: '' },
    ]);
    fixture.componentRef.setInput('groupRoles', [{ id: 'r1' }]);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.saved.subscribe(emitted);
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[buttons.length - 1].click();
    expect(emitted).toHaveBeenCalledWith(['r1']);
  });
});
