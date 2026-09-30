import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import type { GroupsEntity } from '@pos-frontend/groups/data-access';

import { GroupFormComponent } from './group-form.component';

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not emit without a name', () => {
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the edited group name', () => {
    const group: GroupsEntity = { id: 'g1', name: 'Cashiers', roles: [], createdAt: '', updatedAt: '' };
    fixture.componentRef.setInput('group', group);
    fixture.detectChanges();
    const emitted = jest.fn();
    component.submitted.subscribe(emitted);
    fixture.nativeElement.querySelector('button[type=submit]').click();
    expect(emitted).toHaveBeenCalledWith({ name: 'Cashiers' });
  });
});
