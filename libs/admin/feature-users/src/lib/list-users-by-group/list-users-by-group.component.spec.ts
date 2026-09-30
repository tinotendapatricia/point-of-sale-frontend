import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { UserStore } from '@pos-frontend/users/data-access';

import { ListUsersByGroupComponent } from './list-users-by-group.component';

describe('ListUsersByGroupComponent', () => {
  let component: ListUsersByGroupComponent;
  let fixture: ComponentFixture<ListUsersByGroupComponent>;
  const groupStore = { groups: () => [], getAllGroups: jest.fn() };
  const userStore = {
    paginatedUsers: () => [],
    totalUsers: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedUsers: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersByGroupComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: GroupStore, useValue: groupStore },
        { provide: UserStore, useValue: userStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the groups but no users until a group is picked', () => {
    expect(groupStore.getAllGroups).toHaveBeenCalled();
    expect(userStore.getPaginatedUsers).not.toHaveBeenCalled();
  });
});
