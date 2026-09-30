import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { GroupStore } from '@pos-frontend/groups/data-access';
import { UserStore } from '@pos-frontend/users/data-access';

import { UsersContainerComponent } from './users-container.component';

describe('UsersContainerComponent', () => {
  let component: UsersContainerComponent;
  let fixture: ComponentFixture<UsersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersContainerComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: GroupStore, useValue: { groups: () => [], getAllGroups: jest.fn() } },
        {
          provide: UserStore,
          useValue: {
            paginatedUsers: () => [],
            totalUsers: () => 0,
            getPaginatedLoading: () => false,
            getPaginatedUsers: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
