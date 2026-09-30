import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { UserStore } from '@pos-frontend/users/data-access';

import { ListUsersComponent } from './list-users.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  const store = {
    paginatedUsers: () => [],
    totalUsers: () => 0,
    getPaginatedLoading: () => false,
    getPaginatedUsers: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersComponent],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: UserStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the first page', () => {
    expect(store.getPaginatedUsers).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
