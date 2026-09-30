import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { UserRolesFormComponent } from './user-roles-form.component';

describe('UserRolesFormComponent', () => {
  let component: UserRolesFormComponent;
  let fixture: ComponentFixture<UserRolesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the user roles that start checked', () => {
    fixture.componentRef.setInput('roles', [
      { id: 'r1', name: 'VIEW_USERS', createdBy: '' },
      { id: 'r2', name: 'EDIT_USERS', createdBy: '' },
    ]);
    fixture.componentRef.setInput('userRoles', [{ id: 'r2' }]);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.saved.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=button]').click();
    expect(emitted).toHaveBeenCalledWith(['r2']);
  });
});
